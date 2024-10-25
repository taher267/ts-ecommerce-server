import express from "express";
import { addProduct } from "@/product";
import { newProductProps } from "types";
import slugify from "slugify";
import { addProductCategory } from "@/product_category";
import { getCategories } from "@/category";
import idReplacer from "@/utils/idReplacer";

const addItem = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const {
      name,
      description,
      sku,
      model,
      brand,
      regular_price,
      sale_price,
      images,
      slug,
      currency = "$",
      features,
      categories = [],
    } = req.body;
    const s = slug ?? `${slugify(name)}-${sku}`.toLowerCase();
    const newObj: newProductProps = {
      name,
      description,
      sku,
      model,
      brand,
      regular_price,
      sale_price,
      slug: s,
      images,
      currency,
      features,
    };
    const product = await addProduct(newObj);

    const data = {
      ...product,
      categories,
    };
    if (categories?.length) {
      await addProductCategory({
        product_id: product._id,
        category_ids: categories,
      });
      const get_categories = await getCategories({
        query: { _id: { $in: categories } },
      });
      data.categories = get_categories;
    }
    const item = idReplacer(data);
    res.status(201).json({
      item,
      links: {
        self: `/products/${item.id}`,
      },
      success: true,
    });
  } catch (e) {
    next(e);
  }
};

export default addItem;
