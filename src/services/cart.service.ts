import { SystemConstants } from "../constants/SystemContants";
import { Cart, CartItem, CartItemDTO } from "../types/cart.type";

export const CartService = {
  getCart: (): Cart | null => {
    const cartData = localStorage.getItem(SystemConstants.CART);
    if (cartData) {
      const parsedCart = JSON.parse(cartData);
      return new Cart(
        parsedCart.itemDTO,
        parsedCart.items,
        parsedCart.totalPrice
      );
    } else {
      console.log("Cart not found in localStorage");

      return null;
    }
  },

  addToCart: (cartItem: CartItem) => {
    const cart = CartService.getCart();
    if (cart) {
      const existingItemIndex = cart.items.findIndex(
        (item) =>
          item.productId === cartItem.productId &&
          item.variantId === cartItem.variantId
      );
      if (existingItemIndex !== -1) {
        cart.itemDTO[existingItemIndex].quantity += cartItem.quantity;
        cart.items[existingItemIndex].quantity += cartItem.quantity;
      } else {
        cart.items.push(cartItem);
        cart.itemDTO.push(
          new CartItemDTO(
            cartItem.productId,
            cartItem.variantId || 0,
            cartItem.quantity
          )
        );
      }
      cart.totalPrice = CartService.calculateTotalPrice(cart.items);
      localStorage.setItem(SystemConstants.CART, JSON.stringify(cart));
    } else {
      const newCart = new Cart();
      newCart.items.push(cartItem);
      newCart.itemDTO.push(
        new CartItemDTO(
          cartItem.productId,
          cartItem.variantId || 0,
          cartItem.quantity
        )
      );
      newCart.totalPrice = CartService.calculateTotalPrice(newCart.items);
      localStorage.setItem(SystemConstants.CART, JSON.stringify(newCart));
    }
  },

  // removeFromCart: (productId: string) => {
  //   // Logic to remove the item from the cart
  // },

  calculateTotalPrice: (cartItems: CartItem[]): number => {
    return cartItems.reduce((total, item) => {
      const price = item.salePrice || item.originalPrice;
      return total + price * item.quantity;
    }, 0);
  },
};
