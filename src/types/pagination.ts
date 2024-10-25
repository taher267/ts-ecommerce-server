export interface Pagination {
  page: number;
  limit: number;
  totalItems: number;
  totalPage: number;
  prev?: number;
  next?: number;
}

export interface Links {
  self: string;
  prev?: string;
  next?: string;
}

export interface TransformdItem {
  link?: string;
  id?: string;
  // [key: string]: string | string[] | undefined | null;
}
// items,
// selection: ["id", "name"],
// path: "/work-reports",
interface Item {
  [key: string]: string | number;
}
export interface TransformdItemFunc {
  selection: string[];
  items: any[];
  path: string;
  // [key: string]: string | string[] | undefined | null;
}
