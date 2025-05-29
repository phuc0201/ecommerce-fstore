export interface Category {
  id: number;
  name: string;
  urlHandle: string;
  parent: {
    id: number;
    name: string;
    urlHandle: string;
  } | null;
}
