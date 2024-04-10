/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import { Star, ThumbUp } from "../../utils/icons";
import { Link } from "react-router-dom";
import { DETAILS, HOME } from "../../utils/constants";
import { useAppDispatch } from "../../app/hooks";
import { setSearchItem } from "../../app/mediasSlice";
import "./index.css";

const TWEEN_FACTOR_BASE = 0.2;

const EmblaCarousel = (props) => {
  const { slides, options, data, origin, type, imgDetails } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef([]);
  const dispatch = useAppDispatch();

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

  let posterSize = "";
  let backdropSize = "";
  let baseUrl = "";

  if (imgDetails.images?.poster_sizes.length > 0) {
    posterSize =
      imgDetails.images.poster_sizes[imgDetails.images.poster_sizes.length - 1];
    backdropSize =
      imgDetails.images.backdrop_sizes[
        imgDetails.images.backdrop_sizes.length - 1
      ];
    baseUrl = imgDetails.images.secure_base_url;
  }

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

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    dispatch(setSearchItem(true));
  };

  return (
    <div className={`embla ${origin == HOME && "sm:pt-0 pt-[100px]"}`}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {data.length > 0 &&
            slides?.map((index) => {
              const backdropPath = data[index].backdrop_path;
              const posterPath = data[index].poster_path;
              return (
                <Link
                  to={`/details/${data[index].media_type ?? type}/${
                    data[index].id
                  }`}
                  className={`embla__slide ${origin}`}
                  key={data[index].id}
                  onClick={() => handleClick()}
                >
                  <div className="embla__parallax">
                    <div className="embla__parallax__layer">
                      <div
                        className={`absolute top-0 flex align-middle items-center bg-zinc-950 bg-opacity-50 min-h-16 justify-center truncate text-wrap rounded-t-[1rem]
                      ${origin == HOME ? "w-[110%]" : "sm:w-[126] w-[120%]"}`}
                      >
                        <h1
                          className={`${origin}text-zinc-200 font-semibold mx-6 ${
                            origin == HOME
                              ? "sm:text-xl text-base"
                              : " text-base"
                          }`}
                        >
                          {data[index].title != undefined
                            ? data[index].title.toUpperCase()
                            : data[index].name.toUpperCase()}
                        </h1>
                      </div>
                      <img
                        className={`embla__slide__img embla__parallax__img ${
                          origin == HOME ? "h-[29rem]" : "h-[15rem]"
                        }`}
                        src={`${
                          backdropPath != null
                            ? `${baseUrl}${backdropSize}/${backdropPath}`
                            : posterPath != null
                            ? `${baseUrl}${posterSize}/${posterPath}`
                            : "https://www.tigren.com/blog/wp-content/uploads/2021/10/404-error-page-not-found-magento.jpg"
                        }`}
                        alt="Background"
                        loading="eager"
                        rel="preload"
                      />
                    </div>

                    <div
                      className={`flex absolute bottom-0 align-middle items-center bg-zinc-950 bg-opacity-90 min-w-[15%] min-h-10 h-auto justify-center rounded-tr-[1rem] rounded-bl-[1rem]`}
                    >
                      <Star
                        className={
                          "h-4 max-h-4 sm:ml-2 ml-1 sm:mr-1 text-yellow-300"
                        }
                      />
                      <p
                        className={`${
                          origin == HOME
                            ? "sm:text-base text-sm"
                            : "sm:text-sm text-xs"
                        }  text-zinc-200 font-normal`}
                      >
                        {data[index].vote_average.toFixed(2) + "%"}
                      </p>
                      <ThumbUp
                        className={
                          "h-4 max-h-4 sm:ml-2 ml-1 sm:mr-1 text-blue-500"
                        }
                      />
                      <p
                        className={`${
                          origin == HOME
                            ? "sm:text-base text-sm"
                            : "sm:text-sm text-xs sm:rounded-br-[1rem]"
                        }  text-zinc-200 font-normal mr-4`}
                      >
                        {data[index].vote_count}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
      {origin == HOME && (
        <div className="embla__controls">
          <div className="embla__buttons px-4 sm:mt-[2rem] mt-[1rem]">
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
