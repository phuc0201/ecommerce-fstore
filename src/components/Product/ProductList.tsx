import type React from "react";
import ProductCard from "./ProductCard";
import type { Product } from "../../types/product.type";
import type { IPagedResults } from "../../types/pagnigate";

const ProductList: React.FC<{
  isGalleryMode: boolean;
  products: IPagedResults<Product>;
}> = ({ isGalleryMode, products }) => {
  return (
    <div
      className={`grid ${
        !isGalleryMode
          ? "gap-y-10 gap-3 grid-cols-4 mb-10"
          : "mb-1 gap-1 grid-cols-6"
      }`}
    >
      {products.data.map((item) => (
        <div key={item.id}>
          <ProductCard product={item} displayProductInfo={!isGalleryMode} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
