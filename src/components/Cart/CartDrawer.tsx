import React from "react";
import { IoClose } from "react-icons/io5";
import { useCart } from "../../hooks/useCart";
import CartItemCard from "./CartItemCard";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart } = useCart();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed right-0 top-0 h-full lg:w-[500px] sm:w-96 w-full bg-white shadow-xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col justify-between ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center border-b px-4">
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-lg hover:bg-black/10 bg-opacity-0 hover:bg-opacity-100 transition-all flex"
          >
            <IoClose className="m-auto text-xl text-gray-700" />
          </button>
          <h2 className="text-lg font-medium p-4">Giỏ hàng</h2>
        </header>

        <div className="flex-1 overflow-hidden">
          <div className="h-full w-full overflow-y-auto p-4">
            <div className="cartitems">
              {cart?.items.length === 0 ? (
                <div className="text-center text-gray-500">Giỏ hàng trống</div>
              ) : (
                cart?.items.map((item) => (
                  <div
                    key={`${item.productId}-${item.variantId}`}
                    className="mb-4"
                  >
                    <CartItemCard {...item} />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <footer>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-600">Tổng tiền:</span>
              <span className="text-lg font-semibold">
                {cart?.totalPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
            <button className="w-full bg-color-brand-surface text-black py-2 rounded-lg active:scale-95 transition-colors">
              Thanh toán
            </button>
          </div>
        </footer>
      </div>
    </>
  );
};

export default CartDrawer;
