import React, { useEffect } from "react";
// import EmblaCarousel from "../components/EmblaCarousel";
// import { EmblaOptionsType } from "embla-carousel";
import { useAppSelector } from "../app/hooks";
// import { services } from "./api/services";
import { selectMedias } from "../app/mediasSlice";
import { useParams } from "react-router-dom";

const Details: React.FC = () => {
  const medias = useAppSelector(selectMedias);
  const { id } = useParams();
  //   const OPTIONS: EmblaOptionsType = { dragFree: false, loop: false };
  //   const SLIDE_COUNT = medias.mediaList.length;
  //   const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  const data = medias.mediaList.find((item) => item.id.toString() == id);

  useEffect(() => {
    console.log("data: ", data);
  });

  return (
    <div className="flex flex-col text-center min-h-screen h-auto max-w-screen-md bg-gradient">
      <section>
        <img
          className="mt-24 -z-10 absolute w-[768px] h-[40vh] object-cover object-top"
          loading="lazy"
          // src={`https://picsum.photos/600/350?v=${index}`}
          src={`https://image.tmdb.org/t/p/original/${data?.backdrop_path}`}
          alt="Background"
        />
        <div className="flex mt-[38vh] min-h-[50vh] h-auto bg-[rgba(48,48,48,0.75)]">
          <img
            loading="lazy"
            className="sm:p-7 p-3 h-[40vh]"
            // src={`https://picsum.photos/600/350?v=${index}`}
            src={`https://image.tmdb.org/t/p/w780/${data?.poster_path}`}
            alt="Poster"
          />
          <div className="flex flex-col sm:py-7 py-3 flex-grow max-w-[480px] ">
            <h1 className="text-2xl h-[84px] w-full text-left font-semibold content-center mb-4">
              {data?.title != undefined
                ? data?.title.toUpperCase()
                : data?.name?.toUpperCase()}
            </h1>
            <p className="text-left text-md">{data?.overview}</p>
          </div>
        </div>
        {/* <EmblaCarousel slides={SLIDES} options={OPTIONS} data={DATA} /> */}
      </section>
    </div>
  );
};

export default Details;
