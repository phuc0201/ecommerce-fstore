import { useEffect, useState } from "react";
import { GoChevronLeft } from "react-icons/go";
import { GoChevronRight } from "react-icons/go";

const Carousel: React.FC<{
  slides: { id: number; image: string; alt: string }[];
}> = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAnimating, setIsAnimating] = useState(true);

  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];
  const totalSlides = slides.length;

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  useEffect(() => {
    if (currentSlide === 0) {
      setTimeout(() => {
        setIsAnimating(false);
        setCurrentSlide(totalSlides);
        setTimeout(() => setIsAnimating(true), 50);
      }, 500);
    } else if (currentSlide === extendedSlides.length - 1) {
      setTimeout(() => {
        setIsAnimating(false);
        setCurrentSlide(1);
        setTimeout(() => setIsAnimating(true), 50);
      }, 500);
    }
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => prev + 1);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => prev - 1);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index + 1);
  };

  const getActualSlideIndex = () => {
    if (currentSlide === 0) return totalSlides - 1;
    if (currentSlide === extendedSlides.length - 1) return 0;
    return currentSlide - 1;
  };

  return (
    <div className="relative w-full">
      {/* Main carousel container */}
      <div
        className="relative overflow-hidden shadow-2xl"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Slides */}
        <div
          className={`flex h-full  ${
            isAnimating ? "transition-transform duration-500 ease-in-out" : ""
          }`}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {extendedSlides.map((slide, index) => (
            <div key={slide.id + index} className="w-full h-full flex-shrink-0">
              <img
                src={slide.image || "/placeholder.svg"}
                alt={slide.alt || "Promotional slide"}
                className="object-cover w-full h-full"
                loading={slide.id === 1 ? "eager" : "lazy"}
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 text-gray-800 rounded-full w-12 h-12 shadow-lg transition-all duration-200 hover:scale-110"
          onClick={prevSlide}
        >
          <GoChevronLeft className="w-6 h-6 m-auto" />
        </button>

        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 text-gray-800 rounded-full w-12 h-12 shadow-lg transition-all duration-200 hover:scale-110"
          onClick={nextSlide}
        >
          <GoChevronRight className="w-6 h-6 m-auto" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === getActualSlideIndex()
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
