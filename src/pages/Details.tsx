import React, { useEffect, useState } from "react";
import EmblaCarousel from "../components/carousel/EmblaCarousel";
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
  setLoading,
} from "../app/mediasSlice";

import Spinner from "../components/spinner/Spinner";

const Details: React.FC = () => {
  const { type, id } = useParams();
  const medias = useAppSelector(selectMedias);
  const dispatch = useAppDispatch();
  const [similarData, setSimilarData] = React.useState<
    Medias["similarMediaList"]
  >([]);
  const [slides, setSlides] = React.useState<number[]>([]);
  const pageData = medias.mediaList.find((item) => item.id.toString() == id);
  const [data, setData] = React.useState(pageData);

  const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true };

  useEffect(() => {
    if (medias.searchItem && type != undefined && id != undefined) {
      dispatch(setSearchItem(false));
      dispatch(setLoading(true));
      services
        .getMediaItem(type, parseInt(id))
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((res: any) => {
          setData(res);
          services
            .getSimilarMedia(type, res.id)
            .then((res: ResponseMedia) => {
              dispatch(getSimilarMediaList(res.results));
              setSlides(Array.from(Array(res.results.length).keys()));
              setSimilarData(res.results);
              dispatch(setLoading(false));
            })
            .catch((error) => {
              dispatch(setLoading(false));
              throw new Error("error", error);
            });
        })
        .catch((error) => {
          dispatch(setLoading(false));
          throw new Error("error", error);
        });
    }
  }, [id]);

  return (
    <div className="flex flex-col text-center min-h-screen h-auto max-w-screen-md bg-gradient">
      {medias.loading ? (
        <Spinner />
      ) : (
        <>
          <img
            className="mt-24 -z-10 absolute w-[768px] h-[40vh] object-cover object-top"
            loading="eager"
            src={`${
              data?.backdrop_path != null
                ? `https://image.tmdb.org/t/p/original/${data?.backdrop_path}`
                : data?.poster_path != null
                ? `https://image.tmdb.org/t/p/original/${data?.poster_path}`
                : "https://www.tigren.com/blog/wp-content/uploads/2021/10/404-error-page-not-found-magento.jpg"
            }`}
            alt="Background"
            rel="preload"
          />
          <div
            className={`flex mt-[38vh] min-h-[40vh] h-auto bg-[rgba(48,48,48,0.75)] text-left`}
          >
            <div
              className={`sm:flex hidden ${
                data?.poster_path == null &&
                data?.backdrop_path == null &&
                "sm:invisible"
              }`}
            >
              <img
                loading="eager"
                className="sm:py-7 sm:px-7 px-3 py-3 h-[40vh]"
                src={`${
                  data?.poster_path != null
                    ? `https://image.tmdb.org/t/p/w300/${data?.poster_path}`
                    : `https://image.tmdb.org/t/p/w300/${data?.backdrop_path}`
                }`}
                alt="Poster"
                rel="preload"
              />
            </div>
            <div className="flex flex-col sm:py-7 py-3 max-w-[480px] sm:px-0 px-5 sm:pb-5 pb-2">
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
              <h1 className="text-2xl text-left mx-4 my-6 sm:m-6 font-semibold text-white">
                SIMILAR ONES
              </h1>
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
        </>
      )}
    </div>
  );
};

export default Details;
