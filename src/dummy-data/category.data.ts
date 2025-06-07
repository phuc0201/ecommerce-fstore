import type { Category } from "../types/category";

export const categoryDummyData: Category[] = [
  {
    id: 1,
    name: "Nam",
    urlHandle: "Nam",
    parent: null,
  },
  {
    id: 2,
    name: "Nữ",
    urlHandle: "Nu",
    parent: null,
  },
  {
    id: 3,
    name: "Trẻ em",
    urlHandle: "Tre-em",
    parent: null,
  },
  {
    id: 4,
    name: "Áo khoác nam",
    urlHandle: "Ao-khoac-nam",
    parent: {
      id: 1,
      name: "Nam",
      urlHandle: "Nam",
    },
  },
  {
    id: 5,
    name: "Áo nam",
    urlHandle: "Ao-nam",
    parent: {
      id: 1,
      name: "Nam",
      urlHandle: "Nam",
    },
  },
  {
    id: 6,
    name: "Quần nam",
    urlHandle: "Quan-nam",
    parent: {
      id: 1,
      name: "Nam",
      urlHandle: "Nam",
    },
  },
  {
    id: 7,
    name: "Đồ thể thao nam",
    urlHandle: "DJo-the-thao-nam",
    parent: {
      id: 1,
      name: "Nam",
      urlHandle: "Nam",
    },
  },
  {
    id: 8,
    name: "Áo khoác nữ",
    urlHandle: "Ao-khoac-nu",
    parent: {
      id: 2,
      name: "Nữ",
      urlHandle: "Nu",
    },
  },
  {
    id: 9,
    name: "Áo nữ",
    urlHandle: "Ao-nu",
    parent: {
      id: 2,
      name: "Nữ",
      urlHandle: "Nu",
    },
  },
  {
    id: 10,
    name: "Quần nữ",
    urlHandle: "Quan-nu",
    parent: {
      id: 2,
      name: "Nữ",
      urlHandle: "Nu",
    },
  },
  {
    id: 11,
    name: "Đồ thể thao nữ",
    urlHandle: "DJo-the-thao-nu",
    parent: {
      id: 2,
      name: "Nữ",
      urlHandle: "Nu",
    },
  },
  {
    id: 12,
    name: "Áo khoác trẻ em",
    urlHandle: "Ao-khoac-tre-em",
    parent: {
      id: 3,
      name: "Trẻ em",
      urlHandle: "Tre-em",
    },
  },
  {
    id: 13,
    name: "Áo trẻ em",
    urlHandle: "Ao-tre-em",
    parent: {
      id: 3,
      name: "Trẻ em",
      urlHandle: "Tre-em",
    },
  },
  {
    id: 14,
    name: "Quần trẻ em",
    urlHandle: "Quan-tre-em",
    parent: {
      id: 3,
      name: "Trẻ em",
      urlHandle: "Tre-em",
    },
  },
];
