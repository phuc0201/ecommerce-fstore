import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetProductDetails } from "../hooks/reactQuery/product";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductInfo from "../components/Product/ProductInfo";
import type { Size } from "../types/product";
import type { CartItem } from "../types/cart";
import { CartService } from "../services/cart.service";
import { useCart } from "../hooks/useCart";

const Product: React.FC = () => {
  const { slug = "" } = useParams<{ slug?: string }>();
  const productId = slug.split("-").pop() || "0";
  const { data } = useGetProductDetails(parseInt(productId));
  const [onAddToCart, setOnAddToCart] = useState<boolean>(false);
  const [photoAnimate, setPhotoAnimate] = useState<string>("");
  const [crrPhotoId, setCrrPhotoId] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<Size>({
    id: -1,
    name: "",
  });
  const [quantity, setQuantity] = useState<number>(1);
  const mainSlider = useRef<Slider | null>(null);
  const thumbSlider = useRef<Slider | null>(null);
  const photoAnimateEl = useRef<HTMLDivElement | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { setCart } = useCart();

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

  const handleAddToCartAnimation = (colorId: number) => {
    if (!data || isAnimating) return;
    setIsAnimating(true);

    const photoIdx = data.photos.findIndex((i) => i.colorId === colorId);
    const photoUrl = data.photos[photoIdx]?.url;
    if (!photoUrl) return;

    setPhotoAnimate(photoUrl);
    setOnAddToCart(true);

    const el = photoAnimateEl.current;
    const fromRect = el?.getBoundingClientRect();
    const toRect = document
      .getElementById("header_cart")
      ?.getBoundingClientRect();

    if (!el || !fromRect || !toRect) return;

    el.style.transition = "none";
    el.style.opacity = "0";
    el.style.transform = "scale(1)";
    el.style.transformOrigin = "center center";
    el.style.zIndex = "-1";
    el.style.display = "none";

    requestAnimationFrame(() => {
      el.style.display = "block";

      requestAnimationFrame(() => {
        el.style.transition = "all 0.5s ease";
        el.style.opacity = "1";
        el.style.transform = "scale(0.5)";
        el.style.zIndex = "10";

        setTimeout(() => {
          const deltaX = toRect.left - fromRect.right;
          const deltaY = toRect.bottom - fromRect.top;

          el.style.transition = "all 0.8s ease";
          el.style.transformOrigin = "top right";
          el.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.1)`;

          setTimeout(() => {
            setOnAddToCart(false);
            el.style.transition = "none";
            el.style.opacity = "0";
            el.style.transform = "scale(1)";
            el.style.transformOrigin = "center center";
            setIsAnimating(false);
          }, 800);
        }, 500);
      });
    });
  };

  const handleAddToCart = (colorId: number) => {
    handleAddToCartAnimation(colorId);
    if (data) {
      const variant = data.variants.find(
        (v) => v.colorId === colorId && v.sizeId === selectedSize.id
      );

      const cartItem: CartItem = {
        productId: parseInt(productId),
        quantity: quantity,
        variantId: variant?.id ?? -1,
        productName: data.name,
        productImage:
          data.photos.find((photo) => photo.colorId === colorId)?.url || "",
        size: selectedSize,
        color: data.colors.find((c) => c.id === colorId) || {
          id: -1,
          name: "",
        },
        originalPrice: parseInt(data.originalPrice || "0"),
        salePrice: parseInt(data.salePrice || "0") || null,
      };

      CartService.addToCart(cartItem);
      setCart(CartService.getCart());
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
    <div className="lg:min-h-[900px]">
      <div className="border-0 border-b-[1px] border-zinc-200 py-4">
        <div className="max-w-[1280px] mx-auto">
          <div className="text-sm">
            <span className="text-zinc-500 mr-1">
              <Link to={"/"}>Trang chủ</Link> /
            </span>
            <span className="text-zinc-500 mr-1">
              <Link to={"/category"}>Danh mục</Link> /
            </span>
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
              <div className="w-[528px] h-[704px] relative">
                <div className="">
                  <div
                    className={`absolute inset-0 bg-black/30 transition-all rounded-2xl durantion-1000 ${
                      onAddToCart ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>
                  <div
                    ref={photoAnimateEl}
                    className={`absolute inset-0 w-full h-full bg-gray-100 rounded-2xl ${
                      onAddToCart ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <img
                      src={photoAnimate || "photo"}
                      alt="photo"
                      className="rounded-2xl w-full h-full object-cover transition-all duration-500"
                    />
                  </div>
                </div>

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
              onAddToCart={handleAddToCart}
              setSelectedSize={setSelectedSize}
              selectedSize={selectedSize}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
