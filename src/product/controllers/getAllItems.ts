import express from "express";
import Model, { productsCount } from "@/product";
import { defaultQuery } from "../config";
import { getHATEOASForAllItems, getPagination } from "@/utils/query";
import idReplacer from "@/utils/idReplacer";

const getItems = async ({
  page,
  limit,
  sortType,
  sortBy,
  search,
  searchBy,
  searchType,
  expands,
}) => {
  const sortStr = sortType === "dsc" ? -1 : 1;
  // delete defaultFilter.observer;
  const filter = {};

  if (searchBy && search) {
    if (searchType === "pattern") {
      filter[searchBy] = { $regex: search, $options: "i" };
    } else if (searchType === "strict") {
      filter[searchBy] = search;
    }
  }
  // console.log(filter);
  const skip = page * limit - limit;
  const datas = await Model.aggregate([
    { $match: filter },
    {
      $lookup: {
        from: "productCategories",
        localField: "_id",
        foreignField: "product_id",
        as: "productCategory",
      },
    },
    {
      $unwind: {
        path: "$productCategory",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "productCategory.category_ids",
        foreignField: "_id",
        as: "categoryDetails",
      },
    },
    { $sort: { [sortBy]: sortStr } },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        slug: { $first: "$slug" },
        description: { $first: "$description" },
        sku: { $first: "$sku" },
        regular_price: { $first: "$regular_price" },
        sale_price: { $first: "$sale_price" },
        currency: { $first: "$currency" },
        images: { $first: "$images" },
        categories: { $push: "$categoryDetails" },
      },
    },

    {
      $project: {
        id: "$_id",
        name: 1,
        slug: 1,
        description: 1,
        sku: 1,
        regular_price: 1,
        sale_price: 1,
        currency: 1,
        images: 1,
        categories: {
          $reduce: {
            input: "$categories",
            initialValue: [],
            in: { $concatArrays: ["$$value", "$$this"] },
          },
        },
      },
    },
  ])
    .limit(limit)
    .skip(skip);
  return { items: datas, filter };
};
const getAllItems = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const page = req.query.page || defaultQuery.page;
    const limit = req.query.limit || defaultQuery.limit;
    const sortType = req.query.sort_type || defaultQuery.sortType;
    const sortBy = req.query.sort_by || defaultQuery.sortBy;
    const search = req.query.search || defaultQuery.search;
    const searchBy = req.query.searchBy || "";
    const searchType = req.query.searchType || "";
    const expands = req.query.expands || defaultQuery?.search || "";
    const { path, url, query } = req;
    const { items: data, filter } = await getItems({
      page,
      limit,
      sortType,
      sortBy,
      search,
      searchBy,
      searchType,
      expands,
    });
    const request = { path, url, query };
    const totalItems = await productsCount(filter);
    const pagination = getPagination({
      totalItems,
      limit: Number(limit),
      page: Number(page),
    });

    // HATEOAS Links
    const links = getHATEOASForAllItems({
      url: request.url,
      path: request.path,
      query: request.query,
      hasNext: !!pagination.next,
      hasPrev: !!pagination.prev,
      page: Number(page),
    });

    const items = idReplacer(data);
    res.json({ items, links, totalItems, pagination });
  } catch (e) {
    next(e);
  }
};
export default getAllItems;
