import type React from "react";
import type { Photo, Product } from "../../types/product";
import { colorDummyData } from "../../dummy-data/color.data";
import { Link } from "react-router-dom";
import { useState, useRef } from "react";

const ProductCard: React.FC<{
  product: Product;
  displayProductInfo?: boolean;
}> = ({ product, displayProductInfo = true }) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [selectedColor, setSelectedColor] = useState<number | undefined>(
    product.photos.length > 0 ? product.photos[0].colorId : undefined
  );
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | undefined>(
    product.photos.length > 0 ? product.photos[0] : undefined
  );
  const flipTimeoutRef = useRef<any>(null);

  const getColor = (id: number): string => {
    const colorIndex = colorDummyData.findIndex((item) => item.id === id);
    return colorIndex < 0 ? "" : colorDummyData[colorIndex].hex ?? "";
  };

  function selectColor(colorId: number) {
    if (isFlipping || selectedColor === colorId) return;

    const photo = product.photos.find((p) => p.colorId === colorId);
    if (!photo) return;

    if (flipTimeoutRef.current) {
      clearTimeout(flipTimeoutRef.current);
    }
    setIsFlipping(true);
    setSelectedColor(colorId);

    flipTimeoutRef.current = setTimeout(() => {
      setSelectedPhoto(photo);
      setIsFlipping(false);
    }, 150);
  }
  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    const existingRipples = button.querySelectorAll(".ripple");
    existingRipples.forEach((ripple) => ripple.remove());

    const ripple = document.createElement("div");
    ripple.className =
      "ripple absolute rounded-full bg-white/30 pointer-events-none animate-ping";
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  return (
    <div className="grid gap-2">
      <div
        className={`
          relative overflow-hidden w-full aspect-[3/4] 
          ${displayProductInfo ? "rounded-2xl" : ""}
          perspective-1000
        `}
        style={{ perspective: "1000px" }}
      >
        <div
          className={`
            relative w-full h-full transition-transform duration-150 ease-in-out
            ${isFlipping ? "scale-x-0" : "scale-x-100"}
          `}
        >
          <Link
            to={"/product/" + product.urlHandle}
            className={`
              absolute inset-0 w-full h-full
              ${displayProductInfo ? "rounded-2xl" : ""}
            `}
          >
            <img
              loading="lazy"
              src={selectedPhoto?.url || ""}
              alt=""
              className={`
                w-full h-full object-cover transition-transform duration-300 hover:scale-105
                ${displayProductInfo ? "rounded-2xl" : ""}
              `}
            />
          </Link>
        </div>
      </div>

      {displayProductInfo && (
        <>
          <div className="flex items-center gap-3">
            <div className="font-semibold text-xl">
              {parseInt(
                product.salePrice ? product.salePrice : product.originalPrice
              ).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </div>

            {product.salePrice && (
              <s className="text-red-400 pt-1">
                {parseInt(product.originalPrice).toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </s>
            )}
          </div>
          <div className="line-clamp-1 text-black">{product.name}</div>
          <div className="flex items-center gap-2">
            {product.colors.map((item) => (
              <button
                key={item.id}
                onClick={(e) => {
                  createRipple(e);
                  selectColor(item.id);
                }}
                disabled={isFlipping}
                style={{ backgroundColor: getColor(item.id) }}
                className={`
                  relative h-6 w-6 border-2 transition-all duration-300 rounded-full overflow-hidden
                  hover:scale-110 active:scale-95 disabled:cursor-not-allowed
                  ${
                    selectedColor && selectedColor === item.id
                      ? "border-color-brand-surface scale-110"
                      : "border-zinc-300 hover:border-gray-400"
                  }
                `}
              />
            ))}
          </div>
        </>
      )}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-0 {
          transform: rotateY(0deg);
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductCard;
