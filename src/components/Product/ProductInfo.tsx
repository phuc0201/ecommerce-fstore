import React, { useEffect, useState } from "react";
import { colorDummyData } from "../../dummy-data/color.data";
import type { Color, Size } from "../../types/product";
import { FiMinus, FiPlus } from "react-icons/fi";
import { IoBagOutline } from "react-icons/io5";
import { BsFillPatchCheckFill } from "react-icons/bs";
import { CiDeliveryTruck } from "react-icons/ci";
import { RxLoop } from "react-icons/rx";
import { GoShield } from "react-icons/go";
import { FcAssistant } from "react-icons/fc";

type ProductInfoProps = {
  name: string;
  price: number;
  colors: { id: number; name: string }[];
  sizes: { id: number; name: string }[];
  description: string;
  selectedSize: Size;
  quantity: number;
  setQuantity: (quantity: number) => void;
  onColorChange: (colorId: number) => void;
  onAddToCart: (colorId: number) => void;
  setSelectedSize: (size: Size) => void;
};

const ProductInfo: React.FC<ProductInfoProps> = ({
  name,
  price,
  colors,
  sizes,
  description,
  selectedSize,
  quantity = 1,
  setQuantity,
  onColorChange,
  onAddToCart,
  setSelectedSize,
}) => {
  const [selectedColor, setSelectedColor] = useState<Color>({
    id: -1,
    name: "",
    hex: "",
  });

  useEffect(() => {
    if (colors.length > 0) {
      setSelectedColor(colors[0]);
    }

    if (sizes.length > 0) {
      setSelectedSize(sizes[0]);
    }
  }, [colors, sizes]);

  const formatPrice = (p: number) =>
    p.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  const getColorHex = (id: number): string => {
    const index = colorDummyData.findIndex((i) => i.id === id);
    return index < 0 ? "" : colorDummyData[index].hex || "";
  };

  return (
    <div className="w-full max-w-[600px]">
      <div className="text-lg font-semibold text-zinc-800">
        {formatPrice(price)}
      </div>
      <h1 className="text-xl mt-2">{name}</h1>

      <div className="mt-4">
        <div className="text-sm font-medium mb-1">
          Màu sắc: {selectedColor.name}
        </div>
        <div className="flex gap-2">
          {colors.map((color) => (
            <div
              key={color.id}
              onClick={() => {
                setSelectedColor(color);
                onColorChange(color.id);
              }}
              className={`w-12 h-12 rounded-full border-2 cursor-pointer ${
                selectedColor.id === color.id
                  ? "border-yellow-500"
                  : "border-zinc-300"
              }`}
              style={{ backgroundColor: getColorHex(color.id) }}
            />
          ))}
        </div>
      </div>

      <div className="mt-4">
        <div className="text-sm font-medium mb-1">
          Kích thước: {selectedSize.name}
        </div>
        <div className="flex gap-3">
          {sizes.map((size) => (
            <button
              key={size.id}
              onClick={() => setSelectedSize(size)}
              className={`w-12 h-12 rounded-full border-2 text-xs ${
                selectedSize === size
                  ? "border-color-brand-surface"
                  : "border-zinc-300"
              }`}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7 flex items-center gap-4 w-full">
        <div className="flex items-center border border-zinc-300 rounded-full overflow-hidden w-40">
          <button
            className="w-10 h-10 text-xl flex pl-2"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <FiMinus className="m-auto text-gray-600" />
          </button>
          <div className="w-10 text-center flex-1">{quantity}</div>
          <button
            className="w-10 h-10 text-xl flex pr-2"
            onClick={() => setQuantity(quantity + 1)}
          >
            <FiPlus className="m-auto text-gray-600" />
          </button>
        </div>

        <button
          onClick={() => onAddToCart(selectedColor.id)}
          className="flex items-center justify-center gap-4 bg-color-brand-surface hover:bg-yellow-500 font-medium px-6 py-3 rounded-full transition flex-1 text-sm"
        >
          <span>Thêm vào giỏ</span>
          <IoBagOutline className="text-xl" />
        </button>
      </div>

      <div className="mt-10">
        <h1 className="mb-3 flex items-center gap-3">
          <span className="font-medium">FSTORE cam kết</span>
          <BsFillPatchCheckFill className="text-blue-600" />
        </h1>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-3 border border-gray-200 p-3 rounded-xl">
            <div className="flex min-w-10 w-10 h-10 bg-gray-100 rounded-md">
              <CiDeliveryTruck className="m-auto" />
            </div>
            <div className="text-sm">
              Giao trong 3–5 ngày và freeship đơn từ 498k
            </div>
          </div>
          <div className="flex items-center gap-3 border border-gray-200 p-3 rounded-xl">
            <div className="flex min-w-10 w-10 h-10 bg-gray-100 rounded-md">
              <RxLoop className="m-auto" />
            </div>
            <div className="text-sm">Mặc không hợp đổi trả miễn phí</div>
          </div>
          <div className="flex items-center gap-3 border border-gray-200 p-3 rounded-xl">
            <div className="flex min-w-10 w-10 h-10 bg-gray-100 rounded-md">
              <GoShield className="m-auto" />
            </div>
            <div className="text-sm">Cam kết bảo mật thông tin khách hàng</div>
          </div>
          <div className="flex items-center gap-3 border border-gray-200 p-3 rounded-xl">
            <div className="flex min-w-10 w-10 h-10 bg-gray-100 rounded-md">
              <FcAssistant className="m-auto" />
            </div>
            <div className="text-sm text-blue-600">
              Cần tư vấn thêm? Chat ngay!
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <h1 className="font-medium">Mô tả:</h1>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ProductInfo;
