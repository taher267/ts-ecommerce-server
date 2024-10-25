import {
  Links,
  Pagination,
  TransformdItem,
  TransformdItemFunc,
} from "@/types/pagination";
import defaults from "@/config/defaults";
import generateQueryString from "@/utils/qs";

export const getPagination = ({
  totalItems = defaults.totalItems,
  limit = defaults.limit,
  page = defaults.page,
}) => {
  const totalPage = Math.ceil(totalItems / limit);

  const pagination: Pagination = {
    page,
    limit,
    totalItems,
    totalPage,
  };

  if (page < totalPage) {
    pagination.next = page + 1;
  }

  if (page > 1) {
    pagination.prev = page - 1;
  }

  return pagination;
};

export const getHATEOASForAllItems = ({
  url = "/",
  path = "",
  query = {},
  hasNext = false,
  hasPrev = false,
  page = 1,
}) => {
  const links: Links = {
    self: url,
  };

  if (hasNext) {
    const queryStr = generateQueryString({ ...query, page: page + 1 });
    links.next = `${path}?${queryStr}`;
  }
  if (hasPrev) {
    const queryStr = generateQueryString({ ...query, page: page - 1 });
    links.prev = `${path}?${queryStr}`;
  }

  return links;
};

export const getTransformedItems = ({
  items = [],
  selection = [],
  path = "/",
}: TransformdItemFunc) => {
  if (!Array.isArray(items) || !Array.isArray(selection)) {
    throw new Error("Invalid selection");
  }

  if (selection.length === 0) {
    return items.map((item: TransformdItem) => ({
      ...item,
      link: `${path}/${item.id}`,
    }));
  }

  return items.map((item: TransformdItem) => {
    const result: TransformdItem = {};
    selection.forEach((key) => {
      result[key] = item[key];
    });
    result.link = `${path}/${item.id || ""}`;
    return result;
  });
};
