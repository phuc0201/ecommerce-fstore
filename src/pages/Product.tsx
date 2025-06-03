import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductDetails } from "../hooks/reactQuery/product";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductInfo from "../components/Product/ProductInfo";

const Product: React.FC = () => {
  const { slug = "" } = useParams<{ slug?: string }>();
  const productId = slug.split("-").pop() || "0";
  const { data } = useGetProductDetails(parseInt(productId));

  const [crrPhotoId, setCrrPhotoId] = useState<number>(1);

  const mainSlider = useRef<Slider | null>(null);
  const thumbSlider = useRef<Slider | null>(null);

  useEffect(() => {
    if (data?.photos && data.photos.length > 0) {
      setCrrPhotoId(data.photos[0].id);
    }
  }, [data]);

  const getPhotoIndex = (id: number): number =>
    data ? data.photos.findIndex((photo) => photo.id === id) : -1;

  const nextPhoto = () => {
    mainSlider.current?.slickNext();
  };

  const prevPhoto = () => {
    mainSlider.current?.slickPrev();
  };

  const goToPhoto = (id: number) => {
    const index = getPhotoIndex(id);
    if (index >= 0) {
      mainSlider.current?.slickGoTo(index);
    }
  };

  const handleColorChange = (colorId: number) => {
    const targetIndex = data?.photos.findIndex((p) => p.colorId === colorId);

    if (targetIndex !== undefined && targetIndex >= 0 && data) {
      const photoId = data?.photos[targetIndex].id;
      setCrrPhotoId(photoId);
      mainSlider.current?.slickGoTo(targetIndex);
      thumbSlider.current?.slickGoTo(targetIndex);
    }
  };

  const mainSettings = {
    asNavFor: thumbSlider.current ?? undefined,
    arrows: false,
    draggable: false,
    beforeChange: (_: number, next: number) => {
      if (data?.photos) {
        setCrrPhotoId(data.photos[next].id);
      }
    },
  };

  const thumbSettings = {
    asNavFor: mainSlider.current ?? undefined,
    slidesToShow: 5,
    swipeToSlide: true,
    focusOnSelect: true,
    vertical: true,
    verticalSwiping: true,
    arrows: false,
  };

  return (
    <div className="min-h-[800px]">
      <div className="border-0 border-b-[1px] border-zinc-200 py-4">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-sm">
            <span className="text-zinc-500">
              <Link to={"/"}>Trang chủ</Link> /
            </span>{" "}
            {slug}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] py-8">
        <div className="flex gap-12">
          <div className="flex gap-3 w-[648px]">
            {/* Thumbnail Slider */}
            <div className="overflow-y-hidden h-[704px] min-w-[108px]">
              <div className="max-h-[704px] relative">
                <div className="slider-container w-[108px] overflow-hidden">
                  <Slider {...thumbSettings} ref={thumbSlider}>
                    {data?.photos.map((photo) => (
                      <div key={photo.id} className="">
                        <img
                          src={photo.url}
                          alt="thumb"
                          className={`w-full object-cover border-2 cursor-pointer rounded-lg ${
                            photo.id === crrPhotoId
                              ? "border-[#ffda84]"
                              : "border-transparent"
                          }`}
                          onClick={() => goToPhoto(photo.id)}
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>

            {/* Main Slider */}
            <div className="relative w-full">
              <div className="w-[528px] relative overflow-hidden">
                <div className="absolute bottom-5 right-5 z-10 flex items-center gap-3">
                  <button
                    onClick={prevPhoto}
                    className="w-8 h-8 bg-white rounded-full shadow-md active:scale-95 flex"
                  >
                    <IoIosArrowBack className="m-auto text-zinc-600" />
                  </button>
                  <button
                    onClick={nextPhoto}
                    className="w-8 h-8 bg-white rounded-full shadow-md active:scale-95 flex"
                  >
                    <IoIosArrowForward className="m-auto text-zinc-600" />
                  </button>
                </div>
                <Slider {...mainSettings} ref={mainSlider}>
                  {data?.photos.map((photo) => (
                    <div key={photo.id}>
                      <img
                        src={photo.url}
                        alt="main"
                        className="w-full h-[704px] object-cover rounded-xl"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>

          {/* Product info */}
          <div className="flex-1">
            <ProductInfo
              name={data?.name ?? ""}
              price={parseInt(data?.originalPrice ?? "0")}
              colors={data?.colors ?? []}
              sizes={data?.sizes ?? []}
              description={data?.metaDesc ?? ""}
              onColorChange={handleColorChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
