import type { Category } from "./category";

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

export interface Brand {
  id: number;
  name: string;
}

export interface Variant {
  id: number;
  code: string;
  colorId: number;
  sizeId: number;
  productId: number;
  stockQuantity: number;
}

export interface Product {
  id: number;
  code: string;
  urlHandle: string;
  name: string;
  metaDesc: string;
  display: boolean;
  originalPrice: string;
  salePrice: string | null;
  createdDate: string;
  updatedDate: string;
  promotionId: number | null;
  categoryId: number;
  brandId: number;
  viewCount: number;
  saleCount: number;
  variants: Variant[];
  brand: Brand;
  category: Category;
  photos: Photo[];
  sizes: Size[];
  colors: Color[];
}
