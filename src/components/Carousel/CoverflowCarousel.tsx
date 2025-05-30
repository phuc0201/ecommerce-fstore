import React, { useEffect, useState } from "react";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";

type Slide = {
  id: number;
  image: string;
  alt?: string;
};

type Props = {
  slides: Slide[];
  autoPlay?: boolean;
  interval?: number;
};

const CoverflowCarousel: React.FC<Props> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  const getSlideStyle = (index: number) => {
    const offset = index - currentIndex;
    const isActive = offset === 0;
    const isNext =
      offset === 1 || (currentIndex === slides.length - 1 && index === 0);
    const isPrev =
      offset === -1 || (currentIndex === 0 && index === slides.length - 1);

    let transform = "";
    let zIndex = 1;
    let opacity = 0.4;
    let filter = "brightness(0.7)";

    if (isActive) {
      transform = "translateX(0%) scale(1)";
      zIndex = 10;
      opacity = 1;
      filter = "brightness(1)";
    } else if (isNext) {
      transform = "translateX(30%) scale(0.75) rotateY(-15deg)";
      zIndex = 5;
      opacity = 0.6;
    } else if (isPrev) {
      transform = "translateX(-30%) scale(0.75) rotateY(15deg)";
      zIndex = 5;
      opacity = 0.6;
    } else if (
      offset > 1 ||
      (currentIndex === slides.length - 1 && index <= 1)
    ) {
      transform = "translateX(80%) scale(0.6) rotateY(-45deg)";
      zIndex = 1;
      opacity = 0;
    } else {
      transform = "translateX(-80%) scale(0.6) rotateY(45deg)";
      zIndex = 1;
      opacity = 0;
    }

    return {
      transform,
      zIndex,
      opacity,
      filter,
      transition: "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    };
  };

  return (
    <>
      <section
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        className="max-w-screen-sm lg:max-w-full lg:px-12"
      >
        <header className="flex items-center justify-between mb-10">
          <h1 className="font-semibold uppercase text-3xl text-black">
            BST POLO COOL 2025
          </h1>
          <div className="flex items-center gap-3">
            <button
              onClick={goToPrevious}
              className="hover:bg-white/90 text-gray-800 rounded-full w-12 h-12 hover:shadow-lg border border-zinc-200 active:scale-95 transition-all duration-200 hover:scale-110 flex"
            >
              <GoChevronLeft className="w-6 h-6 m-auto" />
            </button>
            <div className="w-10 text-center">
              {currentIndex + 1} / {slides.length}
            </div>
            <button
              onClick={goToNext}
              className="hover:bg-white/90 text-gray-800 rounded-full w-12 h-12 hover:shadow-lg border border-zinc-200 active:scale-95 transition-all duration-200 hover:scale-110 flex"
            >
              <GoChevronRight className="w-6 h-6 m-auto" />
            </button>
          </div>
        </header>
        <div className="relative w-full min-h-[700px] overflow-hidden">
          {/* Slides Container */}
          <div className="flex items-center justify-center">
            <div
              className="relative h-[700px] aspect-video"
              style={{ perspective: "1000px" }}
            >
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className="absolute inset-0 cursor-pointer transform-gpu"
                  style={getSlideStyle(index)}
                  onClick={() => goToSlide(index)}
                >
                  <div className={`w-full h-full rounded-2xl overflow-hidden`}>
                    <img
                      loading="lazy"
                      src={slide.image}
                      alt=""
                      className="object-cover size-full h-full w-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CoverflowCarousel;
