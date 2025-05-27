import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoMenuOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 1);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="header"
      className={`sticky top-0 p-3 z-10 transition-all duration-300 ease-linear max-w-screen-sm mx-auto lg:max-w-full lg:px-12 lg:py-4 flex items-center justify-between ${
        scrolled
          ? "border-b border-b-border-primary bg-white"
          : "bg-transparent"
      }`}
    >
      <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-3xl">
        <IoMenuOutline className="" />
        <span className="text-sm">Danh mục</span>
      </button>
      <div className="text-3xl font-bold">
        <span className="text-[#2a2a86]">F</span>
        <span className="text-[#fcaf17]">Store</span>
      </div>
      <div className="flex items-center gap-2">
        <button
          className={`flex items-center gap-2 bg-white px-5 py-2 w-52 rounded-2xl border border-transparent hover:border-zinc-300 duration-300 transition-all ease-linear ${
            scrolled ? "border-zinc-300" : ""
          }`}
        >
          <CiSearch className="" />
          <span className="text-xs text-zinc-400">Tìm kiếm</span>
        </button>
        <HiOutlineShoppingBag className="text-2xl" />
      </div>
    </header>
  );
};

export default Header;
