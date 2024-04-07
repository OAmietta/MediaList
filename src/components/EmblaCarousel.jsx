/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { Star, ThumbUp } from "../utils/icons";
import { Link } from "react-router-dom";
import { HOME } from "../utils/constants";
// import { DotButton, useDotButton } from "./EmblaCarouselDotButton";

const TWEEN_FACTOR_BASE = 0.2;

const EmblaCarousel = (props) => {
  const { slides, options, data, type } = props;
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
    <div className={`embla ${type == HOME && "sm:pt-0 pt-[100px]"}`}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {data.length > 0 &&
            slides.map((index) => {
              return (
                <Link
                  to={`/details/${data[index].id}`}
                  className={`embla__slide ${type}`}
                  key={data[index].id}
                  onClick={() => console.log("click")}
                >
                  <div className="embla__parallax">
                    <div className="embla__parallax__layer">
                      <div
                        className={`absolute top-0 flex align-middle items-center bg-zinc-950 bg-opacity-50 min-h-16 justify-center truncate text-wrap rounded-t-[1rem]
                      ${type == HOME ? "w-[110%]" : "sm:w-[126] w-[130%]"}`}
                      >
                        <h1
                          className={`${type}text-zinc-200 font-semibold mx-6`}
                        >
                          {data[index].title != undefined
                            ? data[index].title.toUpperCase()
                            : data[index].name.toUpperCase()}
                        </h1>
                      </div>
                      <img
                        className={`embla__slide__img embla__parallax__img ${
                          type == HOME ? "h-[29rem]" : "h-[15rem]"
                        }`}
                        src={`https://image.tmdb.org/t/p/original/${data[index].backdrop_path}`}
                        alt="Background"
                      />
                    </div>
                    {type == HOME && (
                      <div className="absolute bottom-0 flex align-middle items-center bg-zinc-950 bg-opacity-90 min-w-[15%] min-h-10 h-auto justify-center rounded-tr-[1rem] rounded-bl-[1rem]">
                        <Star
                          className={
                            "sm:h-5 h-3 max-h-5 sm:ml-2 m-1 sm:mr-1 text-yellow-300"
                          }
                        />
                        <p
                          className={`${
                            type == HOME ? "text-base" : "sm:text-sm text-xs"
                          }  text-zinc-200 font-normal`}
                        >
                          {data[index].vote_average.toFixed(2) + "%"}
                        </p>
                        <ThumbUp
                          className={
                            "sm:h-5 h-3 max-h-5 sm:ml-2 m-1 sm:mr-1 text-blue-500"
                          }
                        />
                        <p
                          className={`${
                            type == HOME
                              ? "text-base"
                              : "sm:text-sm text-xs sm:rounded-br-[1rem]"
                          }  text-zinc-200 font-normal mr-4`}
                        >
                          {data[index].vote_count}
                        </p>
                      </div>
                    )}
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
      {type == HOME && (
        <div className="embla__controls">
          <div className="embla__buttons px-4">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmblaCarousel;
