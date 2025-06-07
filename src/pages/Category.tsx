import type React from "react";
import { CiGrid41 } from "react-icons/ci";
import { PiGridFourThin } from "react-icons/pi";
import { CiFilter } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useEffect, useMemo, useState } from "react";
import ProductList from "../components/Product/ProductList";
import { useInfiniteProducts } from "../hooks/reactQuery/product";
import { useInView } from "react-intersection-observer";
import SkeletonProductCard from "../components/Product/SkeletonProductCard";
import { useSearchParams } from "react-router-dom";
import type { Filter } from "../types/category";

const Category: React.FC = () => {
  const [searchParams, setSeacrhParams] = useSearchParams();
  const [isGalleryMode, setIsGalleryMode] = useState<boolean>(false);

  const getParamValue = (key: string, fallback?: number) => {
    const value = searchParams.get(key);
    return value !== null ? Number(value) : fallback;
  };

  const filter = useMemo(() => {
    const base: Partial<Filter> = {
      page: getParamValue("page", 0),
      limit: getParamValue("limit", 24),
    };
    const optionalKeys = ["id", "color", "size", "orderType"] as const;

    optionalKeys.forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        const field = key === "id" ? "category" : key;
        base[field as keyof Filter] = Number(value);
      }
    });

    return base as Filter;
  }, [searchParams]);

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteProducts(filter);

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const setQueryParam = (key: string, value: number) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value.toString());
    setSeacrhParams(newParams);
  };

  return (
    <div className="">
      <div className="border-0 border-b-[1px] border-zinc-200 py-4">
        <div className="sectionContainer">
          <div className="text-sm">
            <span className="text-zinc-500">Trang chủ /</span> Shop
          </div>
        </div>
      </div>

      <div className="border-0 border-b-[1px] border-zinc-200 py-4">
        <div className="sectionContainer">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <button
                onClick={() =>
                  setQueryParam("orderType", filter.orderType !== 3 ? 3 : 4)
                }
                className={`border-[1px] border-zinc-200 transition-all duration-300
               rounded-full p-4 py-1 ${
                 filter.orderType !== 3 ? "" : "bg-zinc-100"
               }`}
              >
                Mới nhất
              </button>
              <button
                onClick={() => setQueryParam("orderType", 1)}
                className={`flex items-center gap-2 border-[1px] border-zinc-200
               rounded-full p-4 py-1 transition-all duration-300 ${
                 filter.orderType === 1 ? "bg-zinc-100" : ""
               }`}
              >
                <span>Giá tăng</span>
                <IoIosArrowUp />
              </button>
              <button
                onClick={() => setQueryParam("orderType", 2)}
                className={`flex items-center gap-2 border-[1px] border-zinc-200
               rounded-full p-4 py-1 transition-all duration-300 ${
                 filter.orderType === 2 ? "bg-zinc-100" : ""
               }`}
              >
                <span>Giá giảm</span>
                <IoIosArrowDown />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsGalleryMode(!isGalleryMode)}
                className="relative rounded-full bg-zinc-200 h-[34px] w-[66px] flex"
              >
                <div className="w-8 h-8 flex my-auto">
                  <CiGrid41 className="m-auto" />
                </div>
                <div className="w-8 h-8 flex my-auto">
                  <PiGridFourThin className="m-auto text-xl" />
                </div>
                <div
                  className={`absolute top-[1px] left-[1px] bottom-[1px] bg-white rounded-full w-8 h-8 flex transition-transform duration-500 rotate-0 ${
                    !isGalleryMode ? "" : "translate-x-full rotate-90"
                  }`}
                >
                  {!isGalleryMode ? (
                    <CiGrid41 className="m-auto" />
                  ) : (
                    <PiGridFourThin className="m-auto text-xl" />
                  )}
                </div>
              </button>
              <button className="flex items-center gap-2 rounded-full border-[1px] border-zinc-200 p-4 py-1">
                <CiFilter className="text-lg" />
                <span>Lọc</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="min-h-[800px] sectionContainer">
        <div className="py-5">
          {(isLoading || isFetchingNextPage) && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonProductCard key={i} />
              ))}
            </div>
          )}

          {!isLoading &&
            data?.pages.map((page, idx) => (
              <ProductList
                key={idx}
                isGalleryMode={isGalleryMode}
                products={page}
              />
            ))}

          {/* Trigger scroll load thêm */}
          {hasNextPage && (
            <div ref={ref} className="text-center py-4 text-zinc-400">
              Đang tải thêm sản phẩm...
            </div>
          )}

          {!hasNextPage && (
            <div className="text-center py-4 text-zinc-400">
              Bạn đã xem hết danh sách 🎉
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
