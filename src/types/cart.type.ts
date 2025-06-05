import type { Color, Size } from "./product.type";

export class CartItem {
  productId: number;
  quantity: number;
  variantId?: number;
  productName: string;
  productImage: string;
  size: Size;
  color: Color;
  originalPrice: number;
  salePrice: number | null;

  constructor(
    productId: number,
    quantity: number,
    variantId: number,
    productName: string,
    productImage: string,
    size: Size,
    color: Color,
    originalPrice: number,
    salePrice: number | null = null
  ) {
    this.productId = productId;
    this.quantity = quantity;
    this.variantId = variantId;
    this.productName = productName;
    this.productImage = productImage;
    this.size = size;
    this.color = color;
    this.originalPrice = originalPrice;
    this.salePrice = salePrice;
  }
}

export class Cart {
  itemDTO: CartItemDTO[];
  items: CartItem[];
  totalPrice: number;

  constructor(
    itemDTO: CartItemDTO[] = [],
    items: CartItem[] = [],
    totalPrice: number = 0
  ) {
    this.itemDTO = itemDTO;
    this.items = items;
    this.totalPrice = totalPrice;
  }
}

export class CartItemDTO {
  productId: number;
  variantId: number;
  quantity: number;

  constructor(productId: number, variantId: number, quantity: number) {
    this.productId = productId;
    this.variantId = variantId;
    this.quantity = quantity;
  }
}

export class OrderDTO {
  fullName: string;
  address: string;
  phone: string;
  paymentMethod: string;
  cart: CartItemDTO[];

  constructor(
    fullName: string = "",
    address: string = "",
    phone: string = "",
    paymentMethod: "COD" | "BANKING" = "COD",
    cart: CartItemDTO[] = []
  ) {
    this.fullName = fullName;
    this.address = address;
    this.phone = phone;
    this.paymentMethod = paymentMethod;
    this.cart = cart;
  }
}
