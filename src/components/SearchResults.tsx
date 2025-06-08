import type React from "react";
import type { IPagedResults } from "../types/pagnigate";
import type { Product } from "../types/product";
import ProductCard from "./Product/ProductCard";

type SearchResultsProps = {
  isSearchResultOpen: boolean;
  products: IPagedResults<Product>;
  setIsSearchResultOpen: (open: boolean) => void;
};

const SearchResults: React.FC<SearchResultsProps> = ({
  products,
  isSearchResultOpen,
  setIsSearchResultOpen,
}) => {
  return (
    <>
      <div
        className={`fixed top-[67px] left-0 right-0 max-h-[80vh] h-[80vh] w-full overflow-hidden z-10 bg-white duration-300  transition-all duration-40 ${
          isSearchResultOpen
            ? "translate-y-0 opacity-100 delay-[160ms] top-[68px]"
            : "-translate-y-full opacity-0 delay-0 z-[-1]"
        }`}
      >
        <div className="max-h-full h-full overflow-y-auto small-scrollbar !p-10 pt-5 mx-auto">
          {products.data.length > 0 ? (
            <div className={`grid gap-y-10 gap-3 grid-cols-6 mb-10`}>
              {products.data.map((item) => (
                <div
                  onMouseDown={() => setIsSearchResultOpen(false)}
                  key={item.id}
                >
                  <ProductCard product={item} displayProductInfo={true} />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex">
              <div className="m-auto">
                <p>Không có sản phẩm nào phù hợp nhu cầu của bạn</p>
                <img
                  src="./assets/imgs/empty-listing.svg"
                  alt="img"
                  className="m-auto"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        onClick={() => setIsSearchResultOpen(false)}
        className={`fixed top-[68px] left-0 right-0 bottom-0 cursor-pointer bg-black/20 ${
          isSearchResultOpen ? "block" : "hidden"
        }`}
      ></div>
    </>
  );
};

export default SearchResults;
