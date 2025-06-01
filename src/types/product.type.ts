import type { Category } from "./category.type";

export interface Color {
  id: number;
  name: string;
  hex?: string;
}

export interface Size {
  id: number;
  name: string;
}

export interface Photo {
  id: number;
  url: string;
  position: number;
  productId: number;
  colorId: number;
}

export interface Variant {
  id: number;
  code: string;
  inventoryQuantity: number;
  instock: boolean;
  colorId: number;
  sizeId: number;
  productId: number;
  color: Color;
  size: Size;
}

export interface Brand {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  code: string;
  urlHandle: string;
  name: string;
  metaDesc: string;
  display: boolean;
  inventoryStatus: boolean;
  originalPrice: string;
  salePrice: string | null;
  createdDate: string;
  updatedDate: string;
  promotionId: number | null;
  categoryId: number;
  brandId: number;
  viewCount: number;
  saleCount: number;
  category: Category;
  brand: Brand;
  photos: Photo[];
  variants: Variant[];
  colors: Color[];
}
