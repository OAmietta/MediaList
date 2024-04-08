import React, { useEffect, useState } from "react";
import EmblaCarousel from "../components/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { services } from "../api/services";
import { useParams } from "react-router-dom";
import { DETAILS } from "../utils/constants";
import { Medias, ResponseMedia } from "../interfaces";
import { useAppDispatch, useAppSelector } from "../app/hooks";
// import { services } from "./api/services";
import {
  getSimilarMediaList,
  selectMedias,
  setSearchItem,
} from "../app/mediasSlice";

const Details: React.FC = () => {
  const medias = useAppSelector(selectMedias);
  const dispatch = useAppDispatch();
  const { type, id } = useParams();
  const [similarData, setSimilarData] = React.useState<
    Medias["similarMediaList"]
  >([]);
  const [slides, setSlides] = React.useState<number[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const pageData = medias.mediaList.find((item) => item.id.toString() == id);
  const [data, setData] = React.useState(pageData);

  const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };
  // let SLIDE_COUNT = medias.mediaList.length;
  // let SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  // let SIMILAR_DATA = medias.mediaList;
  //

  useEffect(() => {
    console.log("entro al use effect");
    console.log("data: ", data);
    // if (data != undefined) {
    //   services
    //     .getSimilarMedia(data.media_type, data.id)
    //     .then((res: ResponseMedia) => {
    //       console.log("response app data: ", res.results);
    //       dispatch(getSimilarMediaList(res.results));
    //       setSlides(Array.from(Array(res.results.length).keys()));
    //       setSimilarData(res.results);
    //       console.log("similarData: ", similarData);
    //       // data = medias.mediaList.find((item) => item.id.toString() == id);
    //     })
    //     .catch((error) => {
    //       console.log("error: ", error);
    //     });
    //   // dispatch(getSimilarMediaList(similarMovieList.results));
    // } else
    console.log("searchItem: ", medias.searchItem);
    if (medias.searchItem && type != undefined && id != undefined) {
      console.log("search item: ", medias.searchItem);
      dispatch(setSearchItem(false));
      services
        .getMediaItem(type, parseInt(id))
        .then((res: any) => {
          console.log("response app data: ", res);
          // dispatch(getSimilarMediaList(res.results));
          // setSlides(Array.from(Array(res.results.length).keys()));
          // setSimilarData(res.results);
          // console.log("similarData: ", similarData);
          // data = medias.mediaList.find((item) => item.id.toString() == id);
          console.log("asigno el nuevo data: ", res);
          setData(res);
          setLoading(true);
          console.log("data: ", data);
          console.log("type:", type);
          services
            .getSimilarMedia(type, res.id)
            .then((res: ResponseMedia) => {
              console.log("response app data: ", res.results);
              dispatch(getSimilarMediaList(res.results));
              setSlides(Array.from(Array(res.results.length).keys()));
              setSimilarData(res.results);
              console.log("similarData: ", similarData);
              // data = medias.mediaList.find((item) => item.id.toString() == id);
            })
            .catch((error) => {
              console.log("error: ", error);
            });
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    }
  }, [id]);

  return (
    <div className="flex flex-col text-center min-h-screen h-auto max-w-screen-md bg-gradient">
      <img
        className="mt-24 -z-10 absolute w-[768px] h-[40vh] object-cover object-top"
        loading="lazy"
        src={`${
          data?.backdrop_path != null
            ? `https://image.tmdb.org/t/p/original/${data?.backdrop_path}`
            : data?.poster_path != null
            ? `https://image.tmdb.org/t/p/original/${data?.poster_path}`
            : "https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg"
        }`}
        alt="Background"
      />
      <div className="flex mt-[38vh] min-h-[40vh] h-auto bg-[rgba(48,48,48,0.75)] text-left">
        <div className="sm:visible invisible">
          <img
            loading="lazy"
            className="sm:py-7 sm:pl-7 pl-3 py-3 h-[40vh]"
            src={`https://image.tmdb.org/t/p/w780/${data?.poster_path}`}
            alt="Poster"
          />
        </div>
        <div className="flex flex-col sm:py-7 py-3 sm:pl-7 pl-0 sm:pr-0 pr-3 flex-grow max-w-[480px] ">
          <h1 className="text-2xl h-[84px] w-full text-left font-semibold content-center mb-4">
            {data?.title != undefined
              ? data?.title.toUpperCase()
              : data?.name?.toUpperCase()}
          </h1>
          <p className="text-left text-md">{data?.overview}</p>
        </div>
      </div>
      {similarData.length > 0 && (
        <div>
          <h1 className="text-2xl text-left m-6 font-semibold">SIMILAR ONES</h1>
          <section className="mb-6">
            <EmblaCarousel
              slides={slides}
              options={OPTIONS}
              data={similarData}
              origin={DETAILS}
              type={type}
            />
          </section>
        </div>
      )}
    </div>
  );
};

export default Details;
