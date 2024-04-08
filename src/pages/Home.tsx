import React, { useEffect } from "react";
import EmblaCarousel from "../components/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { useAppSelector } from "../app/hooks";
// import { services } from "./api/services";
import { selectMedias } from "../app/mediasSlice";
import { HOME } from "../utils/constants";

const Home: React.FC = () => {
  const medias = useAppSelector(selectMedias);

  const OPTIONS: EmblaOptionsType = { dragFree: false, loop: true };
  const SLIDE_COUNT = medias.mediaList.length;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  const DATA = medias.mediaList;

  return (
    <div className="flex flex-col justify-center items-center text-center max-w-screen-md bg-gradient">
      <section className="flex sm:h-[76vh] h-screen sm:mt-[7rem] mt-0">
        <EmblaCarousel
          slides={SLIDES}
          options={OPTIONS}
          data={DATA}
          origin={HOME}
        />
      </section>
    </div>
  );
};

export default Home;
