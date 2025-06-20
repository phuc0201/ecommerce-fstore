import type { Color, Size } from "./product";
export class CartItem {
  productId: number;
  quantity: number;
  variantId: number;
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
  name: string;
  address: string;
  phone: string;
  email: string;
  paymentMethod: string;
  cart: CartItemDTO[];
  returnUrl: string;
  to_district_id: number;
  to_ward_code: string;
  voucherId?: number;

  constructor(
    name: string = "",
    address: string = "",
    phone: string = "",
    email: string = "",
    paymentMethod: "COD" | "BANKING" = "COD",
    cart: CartItemDTO[] = [],
    returnUrl: string = import.meta.env.VITE_RETURN_PAYMENT_URL,
    to_district_id: number = 0,
    to_ward_code: string = ""
  ) {
    this.name = name;
    this.address = address;
    this.phone = phone;
    this.email = email;
    this.paymentMethod = paymentMethod;
    this.cart = cart;
    this.returnUrl = returnUrl;
    this.to_district_id = to_district_id;
    this.to_ward_code = to_ward_code;
  }
}
