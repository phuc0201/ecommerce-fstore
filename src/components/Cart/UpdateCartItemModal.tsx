import { IoMdClose } from "react-icons/io";
import type { CartItem } from "../../types/cart";

interface UpdateCartItemModalProps {
  product: CartItem;
  selectedVariantId: number;
  isOpen: boolean;
  onClose: () => void;
}

const UpdateCartItemModal: React.FC<UpdateCartItemModalProps> = ({
  isOpen,
  onClose,
  product,
  selectedVariantId,
}) => {
  if (isOpen) {
    console.log("load data");
  }

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 ${isOpen ? "z-10" : "z-[-1]"}`}
      ></div>
      <div
        className={`fixed z-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 transition-all duration-300 w-[28rem] bg-white rounded-lg shadow-lg text-black text-base ${
          isOpen ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="font-medium">Cập nhật sản phẩm</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border flex text-lg text-black"
          >
            <IoMdClose className="m-auto" />
          </button>
        </header>

        <div className="p-4">
          <div className="flex pb-4 gap-3 border-b border-gray-200 mb-4">
            <img
              src={product.productImage}
              alt="photo"
              className="object-cover w-20 rounded-lg"
            />
            <div className="text-xs flex flex-col gap-2">
              <span>{product.productName}</span>
              <span>{product.size.name + ", " + product.color.name}</span>
            </div>
          </div>
        </div>

        <div>
          <span>Màu sắc: {product.color.name}</span>
        </div>
      </div>
    </>
  );
};

export default UpdateCartItemModal;
