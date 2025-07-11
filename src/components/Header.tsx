import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoHelpOutline, IoMenuOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useCallback, useEffect, useState } from "react";
import MegaMenu from "./MegaMenu";
import { Link, useLocation } from "react-router";
import { useCart } from "../hooks/useCart";
import CartDrawer from "./Cart/CartDrawer";
import SearchResults from "./SearchResults";
import type { IPagedResults } from "../types/pagnigate";
import type { Product } from "../types/product";
import { ProductService } from "../services/product.service";
import { debounce } from "lodash";

const Header: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const { cart } = useCart();
  const [openCartDrawer, setOpenCartDrawer] = useState<boolean>(false);
  const [openSearchResults, setOpenSearchResults] = useState<boolean>(false);
  const [products, setProducts] = useState<IPagedResults<Product>>({
    data: [],
    total: 0,
    totalPages: 0,
    page: 0,
    limit: 10,
  });
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const handleMenuClick = () => {
    setIsMegaMenuOpen((prev) => !prev);
  };

  const fetchSearchResults = (searchValue: string) => {
    if (!searchValue) return;
    ProductService.searchProduct(searchValue).then((res) => {
      setProducts(res);
    });
  };

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      fetchSearchResults(value);
    }, 100),
    []
  );

  const handleSearch = (value: string) => {
    debouncedSearch(value);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getTotalQuantity = (): number =>
    cart?.itemDTO?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <>
      <header
        id="header"
        className={`sticky top-0 p-3 z-10 transition-all duration-300 ease-linear mx-auto lg:max-w-full lg:px-12 sm:px-8 px-4 lg:py-4 flex-col ${
          isMobile ? "bg-white" : ""
        } ${
          !isMobile && (scrolled || location.pathname !== "/")
            ? "border-b border-b-border-primary bg-white"
            : "bg-transparent"
        }`}
      >
        <div className="flex justify-between items-center w-full">
          <SearchResults
            products={products}
            isSearchResultOpen={openSearchResults}
            setIsSearchResultOpen={setOpenSearchResults}
          />
          {!isMobile && (
            <MegaMenu
              isMegaMenuOpen={isMegaMenuOpen}
              setIsMegaMenuOpen={setIsMegaMenuOpen}
            />
          )}
          <button
            onClick={() => handleMenuClick()}
            className={`flex items-center gap-2 border border-transparent bg-white py-[6px] md:px-4 rounded-3xl ${
              !isMobile && (scrolled || location.pathname !== "/")
                ? "border-zinc-200"
                : ""
            }`}
          >
            <IoMenuOutline className="md:text-lg text-3xl" />
            <span className="md:block hidden text-sm">Danh mục</span>
          </button>
          <Link to={"/"} className="text-2xl font-bold">
            <span className="text-[#2a2a86]">F</span>
            <span className="text-[#fcaf17]">Store</span>
          </Link>

          <div className="flex items-center gap-2">
            <div
              className={`md:flex hidden items-center gap-2 bg-white px-5 py-1 w-52 rounded-2xl border border-transparent hover:border-zinc-300 duration-300 transition-all ease-linear ${
                scrolled || location.pathname !== "/" ? "border-zinc-300" : ""
              }`}
            >
              <CiSearch />
              <input
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => setOpenSearchResults(true)}
                type="text"
                placeholder="Tìm kiếm"
                className="w-full outline-none focus:ring-0 focus:border-0 text-xs placeholder:text-xs py-1"
              />
            </div>

            <button
              onClick={() => setOpenCartDrawer((prev) => !prev)}
              className="relative cursor-pointer"
            >
              <div
                className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex z-[9] ${
                  cart && cart.itemDTO.length > 0 ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="m-auto">
                  {getTotalQuantity() < 9 ? getTotalQuantity() : "9+"}
                </div>
              </div>
              <HiOutlineShoppingBag
                id="header_cart"
                className="text-2xl relative"
              />
            </button>

            <Link
              to={"/help"}
              className="md:flex hidden items-center ml-3 border border-black rounded-full p-1 px-3"
            >
              <IoHelpOutline className="" />
              <p className="text-sm">Hỗ trợ</p>
            </Link>
          </div>
        </div>
        {isMobile && (
          <div
            className={`flex items-center gap-2 mt-2 bg-white px-5 py-[6px] w-full rounded-full border border-zinc-200 duration-300 transition-all ease-linear`}
          >
            <CiSearch size={25} />
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="w-full outline-none focus:ring-0 focus:border-0 text-xs placeholder:text-xs py-1"
            />
          </div>
        )}
      </header>

      <CartDrawer
        isOpen={openCartDrawer}
        onClose={() => setOpenCartDrawer(false)}
      />
    </>
  );
};

export default Header;
