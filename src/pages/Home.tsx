import React, { useEffect } from "react";
import EmblaCarousel from "../components/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { useAppSelector } from "../app/hooks";
// import { services } from "./api/services";
import { selectMedias } from "../app/mediasSlice";

const Home: React.FC = () => {
  const medias = useAppSelector(selectMedias);

  useEffect(() => {
    console.log("medias: ", medias);
  }, [medias]);

  const OPTIONS: EmblaOptionsType = { dragFree: false, loop: false };
  const SLIDE_COUNT = medias.mediaList.length;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  const DATA = medias.mediaList;

  return (
    <div className="flex flex-col justify-center items-center text-center h-screen max-w-screen-md bg-gradient">
      <section>
        <EmblaCarousel slides={SLIDES} options={OPTIONS} data={DATA} />
      </section>
    </div>
  );
};

export default Home;
