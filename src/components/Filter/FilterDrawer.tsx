import { IoMdClose } from "react-icons/io";
import { colorDummyData } from "../../dummy-data/color.data";
import { SizeDummyDate } from "../../dummy-data/size.data";

interface FilterProps {
  isOpen: boolean;
  selectedColor: number;
  selectedSize: number;
  setSelectedColor: (id: number) => void;
  setSelectedSize: (id: number) => void;
  onClose: () => void;
}

export default function FilterDrawer(filter: FilterProps) {
  const handleSelectColor = (id: number) => {
    filter.setSelectedColor(id === filter.selectedColor ? -1 : id);
  };

  const handleSelectSize = (id: number) => {
    filter.setSelectedSize(id === filter.selectedSize ? -1 : id);
  };

  return (
    <>
      <div
        onClick={filter.onClose}
        className={`${
          filter.isOpen ? "block" : "hidden"
        } fixed inset-0 bg-black/20 z-10 cursor-pointer`}
      ></div>
      <div
        className={`sm:w-96 w-full bg-white fixed right-0 top-0 bottom-0 z-20 transition-all duration-300 shadow-xl ${
          filter.isOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        }`}
      >
        <header className="flex items-center justify-between p-4 py-2 border-b">
          <div className="font-medium">Bộ lọc</div>
          <button
            onClick={filter.onClose}
            className="hover:bg-zinc-100 hover:bg-opacity-100 bg-opacity-0 transition-all text-black rounded-lg w-10 h-10 flex"
          >
            <IoMdClose className="m-auto text-xl" />
          </button>
        </header>
        <div>
          <div className="p-4">
            <p className="text-sm mb-2">Màu</p>
            <div className="flex flex-wrap gap-4">
              {colorDummyData.map((item) => (
                <button
                  onClick={() => handleSelectColor(item.id)}
                  key={item.id}
                  className={`flex items-center p-2 py-1 gap-3 border rounded-full ${
                    filter.selectedColor === item.id ? "bg-zinc-200" : ""
                  }`}
                >
                  <div
                    style={{
                      backgroundColor: item.hex,
                    }}
                    className={`w-4 h-4 rounded-full border-2`}
                  ></div>
                  <div className="text-xs">{item.name}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="p-4">
            <p className="text-sm mb-2">Size</p>
            <div className="flex flex-wrap gap-4">
              {SizeDummyDate.map((item) => (
                <button
                  onClick={() => handleSelectSize(item.id)}
                  key={item.id}
                  className={`flex items-center p-2 px-4 gap-3 border rounded-full ${
                    filter.selectedSize === item.id ? "bg-zinc-200" : ""
                  }`}
                >
                  <div className="text-xs">{item.name}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
