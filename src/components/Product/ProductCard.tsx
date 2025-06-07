import type React from "react";
import type { Product } from "../../types/product";
import { colorDummyData } from "../../dummy-data/color.data";
import { Link } from "react-router-dom";

const ProductCard: React.FC<{
  product: Product;
  displayProductInfo?: boolean;
}> = ({ product, displayProductInfo = true }) => {
  const getColor = (id: number): string => {
    const colorIndex = colorDummyData.findIndex((item) => item.id === id);

    return colorIndex < 0 ? "" : colorDummyData[colorIndex].hex ?? "";
  };
  return (
    <div className="grid gap-2">
      <Link
        to={"/product/" + product.urlHandle}
        className={`overflow-hidden w-full aspect-[3/4] ${
          displayProductInfo ? "rounded-2xl" : ""
        }`}
      >
        <img
          loading="lazy"
          src={product.photos[0].url || ""}
          alt=""
          className={`${displayProductInfo ? "rounded-2xl" : ""}`}
        />
      </Link>
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
          <div className="line-clamp-1">{product.name}</div>
          <div className="flex items-center gap-1">
            {product.colors.map((item) => (
              <button
                key={item.id}
                style={{ backgroundColor: getColor(item.id) }}
                className={`h-6 w-6 border-2 border-zinc-300 rounded-full`}
              ></button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;
