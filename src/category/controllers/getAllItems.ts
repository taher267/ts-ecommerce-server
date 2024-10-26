import express from "express";
import { categoriesCount, getCategories } from "@/category";
import defaults from "@/config/defaults";
import {
  getHATEOASForAllItems,
  getPagination,
  getTransformedItems,
} from "@/utils/query";
import idReplacer from "@/utils/idReplacer";

const getAllItems = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const limit = req.query.limit ? Number(req.query.limit) : defaults.limit;
    const page = req.query.page ? Number(req.query.page) : defaults.page;
    const sortType = req.query.sort_type || defaults.sortType;
    const sortBy = req.query.sort_by || defaults.sortBy;
    const search = req.query.search || defaults.search;
    const searchBy = (req.query.searchBy || "") as string;
    const searchType = req.query.searchType || "";
    const { path, url, query } = req;
    const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
    const filter = {};

    if (searchBy && search) {
      if (searchType === "pattern") {
        filter[searchBy] = { $regex: search, $options: "i" };
      } else if (searchType === "strict") {
        filter[searchBy] = search;
      }
    }

    const skip = page * limit - limit;
    const items = await getCategories({
      query: filter,
      limit,
      skip,
      sort: sortStr,
    });
    if (!items?.length) {
      throw res.json({ items });
    }
    const datas = idReplacer(items);
    const dataItems = getTransformedItems({
      items: datas,
      selection: ["id", "name"],
      path: "/categories",
    });

    // pagination
    const totalItems = await categoriesCount(filter);

    const pagination = getPagination({ totalItems, limit, page });

    // HATEOAS Links
    const links = getHATEOASForAllItems({
      url,
      path,
      query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page,
    });
    res.json({ items: dataItems, totalItems, pagination, links });
  } catch (e) {
    next(e);
  }
};
export default getAllItems;
