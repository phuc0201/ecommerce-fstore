import React from "react";
import type { CarouselProps } from "../../types/carousel";
import CoverflowCarousel from "./CoverflowCarousel";
import NormalCarousel from "./NormalCarousel";

const Carousel: React.FC<CarouselProps> = ({ slides, variant = "full" }) => {
  return (
    <>
      {variant == "full" && <NormalCarousel slides={slides} />}
      {variant == "center" && <CoverflowCarousel slides={slides} />}
    </>
  );
};

export default Carousel;
