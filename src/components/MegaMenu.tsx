import { useEffect, useState } from "react";
import type { Category } from "../types/category";
import { categoryDummyData } from "../dummy-data/category.data";
import { Link, useLocation } from "react-router";
import { GoArrowUpRight } from "react-icons/go";
import { SlArrowDown } from "react-icons/sl";
import { collectionDummyData } from "../dummy-data/collection.data";
import PATH from "../constants/routePaths";

type MegaMenuProps = {
  isMegaMenuOpen: boolean;
  setIsMegaMenuOpen: (open: boolean) => void;
};

const MegaMenu: React.FC<MegaMenuProps> = (props) => {
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const location = useLocation();

  const toggleCategory = (id: number) => {
    setExpandedCategories((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getMainCategories = (): Category[] => {
    return categoryDummyData.filter((category) => category.parent === null);
  };

  const getSubCategories = (parentId: number): Category[] => {
    return categoryDummyData.filter(
      (category) => category.parent?.id === parentId
    );
  };

  useEffect(() => {
    if (props.isMegaMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [props.isMegaMenuOpen]);

  useEffect(() => {
    props.setIsMegaMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 h-fit z-10 text-white bg-white duration-300  transition-all duration-40 ${
          props.isMegaMenuOpen
            ? "translate-y-0 opacity-100 delay-[160ms]"
            : "-translate-y-full opacity-0 delay-0"
        }`}
      >
        <div className="w-full h-full bg-white text-black p-5 px-12">
          {/* CATEGORY */}
          <div className="grid grid-cols-4 divide-x divide-dashed divide-border-primary mt-5">
            {getMainCategories().map((item, index) => {
              return (
                <div
                  key={index}
                  className="cursor-pointer space-y-3 px-4 first:pl-0 last:pr-0"
                >
                  <Link
                    to={PATH.CATEGORY + "?id=" + item.id}
                    className="group flex w-fit items-center"
                  >
                    <p className="text-lg font-semibold uppercase group-hover:text-blue-800">
                      {item.name}
                    </p>
                    <GoArrowUpRight className="text-xl group-hover:text-blue-800" />
                  </Link>
                  <div className="small-scrollbar max-h-[calc(100vh-280px)] h-[calc(100vh-280px)] space-y-2 overflow-y-auto overflow-x-hidden">
                    {getSubCategories(item.id).map((itemSub, index) => {
                      const isOpen = expandedCategories.includes(itemSub.id);
                      return (
                        <div key={index}>
                          <div
                            onClick={() => toggleCategory(itemSub.id)}
                            className="flex items-center justify-between gap-3 py-2"
                          >
                            <div className="font-medium">{itemSub.name}</div>
                            <SlArrowDown
                              className={`transition-transform duration-200 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </div>
                          <div
                            className={`${isOpen ? "block" : "hidden"} px-5`}
                          >
                            <Link
                              to={PATH.CATEGORY + "?id=" + itemSub.id}
                              className="py-2 text-sm block"
                            >
                              Tất cả
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            <div className="cursor-pointer space-y-3 px-4 first:pl-0 last:pr-0">
              <div className="text-lg font-semibold uppercase">bộ sưu tập</div>
              <div className="small-scrollbar max-h-[calc(100vh-280px)] h-[calc(100vh-280px)] space-y-2 overflow-y-auto overflow-x-hidden">
                {collectionDummyData.map((item, index) => {
                  return (
                    <div key={index} className="block group pb-3">
                      <img
                        loading="lazy"
                        src={`${item.image}`}
                        alt=""
                        className="rounded-lg mb-1"
                      />
                      <p className="font-medium group-hover:text-blue-800">
                        {item.title}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        onClick={() => props.setIsMegaMenuOpen(false)}
        className={`fixed top-0 left-0 right-0 bottom-0 cursor-pointer bg-black/20 ${
          props.isMegaMenuOpen ? "block" : "hidden"
        }`}
      ></div>
    </>
  );
};

export default MegaMenu;
