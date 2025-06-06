import { CiTrash } from "react-icons/ci";
import type { CartItem } from "../../types/cart.type";
import { CartService } from "../../services/cart.service";
import { useCart } from "../../hooks/useCart";
import { FiMinus, FiPlus } from "react-icons/fi";

const CartItemCard: React.FC<CartItem> = (item) => {
  const { setCart } = useCart();

  const handleRemove = () => {
    CartService.removeFromCart(item.productId, item.variantId);
    setCart(CartService.getCart());
  };

  const increaseQuantity = () => {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    CartService.updateCartQuantity(
      updatedItem.productId,
      updatedItem.variantId,
      updatedItem.quantity
    );
    setCart(CartService.getCart());
  };
  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: Math.max(item.quantity - 1, 1) };
      CartService.updateCartQuantity(
        updatedItem.productId,
        updatedItem.variantId,
        updatedItem.quantity
      );
      setCart(CartService.getCart());
    }
  };
  return (
    <div className="flex justify-between py-4">
      <div className="flex items-center">
        <img
          src={item.productImage}
          alt={item.productName}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="ml-4">
          <h3 className="text-sm font-medium">{item.productName}</h3>
          <p className="text-xs text-gray-500">
            {item.size.name} - {item.color.name} x {item.quantity}
          </p>
          <div className="flex items-center text-xs gap-2 mt-2 bg-white rounded-full border border-gray-200 w-fit">
            <button onClick={decreaseQuantity} className="px-2 py-1">
              <FiMinus />
            </button>
            <div>{item.quantity}</div>
            <button
              onClick={increaseQuantity}
              className="px-2 py-1 rounded-l-full"
            >
              <FiPlus />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between items-end min-h-full">
        <button onClick={handleRemove} className="group">
          <CiTrash className="text-xl group-hover:text-red-500" />
        </button>
        <span className="text-sm font-semibold">
          {(
            (item.salePrice || item.originalPrice) * item.quantity
          ).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </span>
      </div>
    </div>
  );
};

export default CartItemCard;
