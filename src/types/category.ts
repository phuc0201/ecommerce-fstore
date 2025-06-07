export interface Category {
  id: number;
  name: string;
  urlHandle: string;
  parent?: {
    id: number;
    name: string;
    urlHandle: string;
  } | null;
}

export interface Filter {
  page: number;
  limit: number;
  category?: number;
  color?: number;
  size?: number;
  orderType?: number; // 1: giá tăng 2: giá giảm 3: mới nhất 4: cũ nhất
}
