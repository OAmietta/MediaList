import React from "react";
import EmblaCarousel from "../components/carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import { useAppSelector } from "../app/hooks";
import { selectMedias } from "../app/mediasSlice";
import { HOME } from "../utils/constants";
import Spinner from "../components/spinner/Spinner";

const Home: React.FC = () => {
  const medias = useAppSelector(selectMedias);

  const options: EmblaOptionsType = { dragFree: false, loop: true };
  const slideCount = medias.mediaList.length;
  const slides = Array.from(Array(slideCount).keys());
  const data = medias.mediaList;
  const imgDetails = medias.imageDetails;

  return (
    <div className="flex flex-col justify-center items-center text-center max-w-screen-md bg-gradient">
      {medias.loading ? (
        <Spinner />
      ) : (
        <section className="flex sm:h-[76vh] h-screen sm:mt-[7rem] mt-0">
          <EmblaCarousel
            slides={slides}
            options={options}
            data={data}
            origin={HOME}
            imgDetails={imgDetails}
          />
        </section>
      )}
    </div>
  );
};

export default Home;
