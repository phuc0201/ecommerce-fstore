import type React from "react";
import ProductCard from "./ProductCard";
import { productsDummyData } from "../../dummy-data/products.data";

const ProductList: React.FC<{ isGalleryMode: boolean }> = ({
  isGalleryMode,
}) => {
  return (
    <div
      className={`grid ${
        isGalleryMode ? "gap-y-10 gap-3 grid-cols-4" : "gap-1 grid-cols-5"
      }`}
    >
      {productsDummyData.data.map((item) => (
        <ProductCard
          key={item.id}
          product={item}
          displayProductInfo={isGalleryMode}
        />
      ))}
    </div>
  );
};

export default ProductList;
