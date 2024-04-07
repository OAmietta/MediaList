import React, { useEffect } from "react";
import EmblaCarousel from "../components/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { useAppSelector } from "../app/hooks";
// import { services } from "./api/services";
import { selectMedias } from "../app/mediasSlice";
import { HOME } from "../utils/constants";
import Footer from "../components/Footer";

const Home: React.FC = () => {
  const medias = useAppSelector(selectMedias);

  useEffect(() => {
    console.log("medias: ", medias);
  }, [medias]);

  const OPTIONS: EmblaOptionsType = { dragFree: false, loop: true };
  const SLIDE_COUNT = medias.mediaList.length;
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys());
  const DATA = medias.mediaList;

  return (
    <div className="flex flex-col justify-center items-center text-center h-screen max-w-screen-md bg-gradient">
      {/* <h1 className="text-3xl text-left pl-6 font-bold w-full">TRENDING</h1> */}
      <section>
        <EmblaCarousel
          slides={SLIDES}
          options={OPTIONS}
          data={DATA}
          type={HOME}
        />
      </section>
      {/* <Footer /> */}
    </div>
  );
};

export default Home;
