import express from "express";
import { getProducts } from "@/product";
import Model from "@/product";

const getAllItems = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    // const { query } = req;
    // const items = await getProducts({}).sort("-createdAt").select(
    //   "_id name slug category regular_price sale_price currenty images"
    //   //  "_id name slug description sku model brand regular_price sale_price currenty features images createdAt"
    // );
    const items = await Model.aggregate([
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
          _id: 1,
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
      .limit(12)
      .skip(0);
    res.json({ items });
  } catch (e) {
    next(e);
  }
};
export default getAllItems;
