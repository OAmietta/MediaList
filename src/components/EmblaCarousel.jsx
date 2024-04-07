/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { Star, ThumbUp } from "../utils/icons";
// import { DotButton, useDotButton } from "./EmblaCarouselDotButton";

const TWEEN_FACTOR_BASE = 0.2;

const EmblaCarousel = (props) => {
  const { slides, options, data } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef([]);

  // const { selectedIndex, scrollSnaps, onDotButtonClick } =
  //   useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const setTweenNodes = useCallback((emblaApi) => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__parallax__layer");
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenParallax = useCallback((emblaApi, eventName) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === "scroll";

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
        const tweenNode = tweenNodes.current[slideIndex];
        tweenNode.style.transform = `translateX(${translate}%)`;
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenParallax(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenParallax)
      .on("scroll", tweenParallax);
  }, [emblaApi, tweenParallax]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {data.length > 0 &&
            slides.map((index) => {
              return (
                <a
                  className="embla__slide"
                  key={data[index].id}
                  onClick={() => console.log("click")}
                >
                  <div className="embla__parallax">
                    <div className="embla__parallax__layer">
                      <div className="absolute top-0 flex align-middle items-center bg-zinc-950 bg-opacity-50 w-[110%] min-h-16 justify-center truncate text-wrap">
                        <h1 className=" text-2xl text-zinc-200 font-bold mx-6">
                          {data[index].title != undefined
                            ? data[index].title.toUpperCase()
                            : data[index].name.toUpperCase()}
                        </h1>
                      </div>
                      <img
                        className="embla__slide__img embla__parallax__img"
                        // src={`https://picsum.photos/600/350?v=${index}`}
                        src={`https://image.tmdb.org/t/p/w780/${data[index].backdrop_path}`}
                        alt="Your alt text"
                      />
                    </div>
                    <div className="absolute bottom-0 flex align-middle items-center bg-zinc-950 bg-opacity-90 min-w-[15%] min-h-10 h-auto justify-center rounded-tr-lg rounded-bl-lg">
                      <Star className={"min-h-5 max-h-5 m-2 text-yellow-300"} />
                      <p className=" text-xl text-zinc-200 font-normal">
                        {data[index].vote_average.toFixed(2) + "%"}
                      </p>
                      <ThumbUp
                        className={"min-h-5 max-h-5 m-2 text-blue-500"}
                      />
                      <p className=" text-xl text-zinc-200 font-normal mr-4">
                        {data[index].vote_count}
                      </p>
                    </div>
                  </div>
                </a>
              );
            })}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons px-4">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
