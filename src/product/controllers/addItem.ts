import express from "express";
import { addProduct } from "@/product";
import { newProductProps } from "types";
import slugify from "slugify";
import { addProductCategory } from "@/product_category";
import { getCategories } from "@/category";
import idReplacer from "@/utils/idReplacer";
import { getColors } from "@/color";
import { addProductColor } from "@/product_color";
import { addProductSize } from "@/product_size";
import { addProductTag } from "@/product_tag";
import { getTags } from "@/tag";
import { getSizes } from "@/size";

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
      colors = [],
      tags = [],
      sizes = [],
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
      colors,
      tags,
      sizes,
    };
    const product_id = product._id;
    if (categories?.length) {
      await addProductCategory({
        product_id,
        category_ids: categories,
      });
      const get_categories = await getCategories({
        query: { _id: { $in: categories } },
      });
      data.categories = get_categories;
    }
    if (colors?.length) {
      await addProductColor({
        product_id,
        color_ids: colors,
      });
      const get_colors = await getColors({
        query: { _id: { $in: colors } },
      });
      data.colors = get_colors;
    }

    if (sizes?.length) {
      await addProductSize({
        product_id,
        size_ids: sizes,
      });
      const get_sizes = await getSizes({
        query: { _id: { $in: sizes } },
      });
      data.sizes = get_sizes;
    }
    if (tags?.length) {
      await addProductTag({
        product_id,
        tag_ids: tags,
      });
      const get_tags = await getTags({
        query: { _id: { $in: tags } },
      });
      data.tags = get_tags;
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
