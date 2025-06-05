import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoMenuOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import MegaMenu from "./MegaMenu";
import { Link, useLocation } from "react-router";
import { useCart } from "../hooks/useCart";
import CartDrawer from "./Cart/CartDrawer";

const Header: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const { cart } = useCart();
  const [openCartDrawer, setOpenCartDrawer] = useState<boolean>(false);

  const handleMenuClick = () => {
    setIsMegaMenuOpen((prev) => !prev);
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
        className={`sticky top-0 p-3 z-10 transition-all duration-300 ease-linear max-w-screen-sm mx-auto lg:max-w-full lg:px-12 lg:py-4 flex items-center justify-between ${
          scrolled || location.pathname !== "/"
            ? "border-b border-b-border-primary bg-white"
            : "bg-transparent"
        }`}
      >
        <MegaMenu
          isMegaMenuOpen={isMegaMenuOpen}
          setIsMegaMenuOpen={setIsMegaMenuOpen}
        />
        <button
          onClick={() => handleMenuClick()}
          className={`flex items-center gap-2 border border-transparent bg-white px-4 py-[6px] rounded-3xl ${
            scrolled || location.pathname !== "/" ? "border-zinc-200" : ""
          }`}
        >
          <IoMenuOutline className="" />
          <span className="text-sm">Danh mục</span>
        </button>
        <Link to={"/"} className="text-2xl font-bold">
          <span className="text-[#2a2a86]">F</span>
          <span className="text-[#fcaf17]">Store</span>
        </Link>
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-2 bg-white px-5 py-2 w-52 rounded-2xl border border-transparent hover:border-zinc-300 duration-300 transition-all ease-linear ${
              scrolled || location.pathname !== "/" ? "border-zinc-300" : ""
            }`}
          >
            <CiSearch className="" />
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="w-full outline-none focus:ring-0 focus:border-0 text-xs placeholder:text-xs"
            />
          </div>
          <button
            onClick={() => setOpenCartDrawer((prev) => !prev)}
            className="relative cursor-pointer"
          >
            <div
              className={`absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex z-10 ${
                cart ? "opacity-100" : "opacity-0"
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
        </div>
      </header>

      <CartDrawer
        isOpen={openCartDrawer}
        onClose={() => setOpenCartDrawer(false)}
      />
    </>
  );
};

export default Header;
