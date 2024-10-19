import express from "express";
import userRoute from "@/user/user.routes";
import authRoute from "@/auth/auth.routes";
import productRoute from "@/product/product.routes";
import categoryRoute from "@/category/category.routes";
import sizeRoute from "@/size/size.routes";
import colorRoute from "@/color/color.routes";
import tagRoute from "@/tag/tag.routes";
// import productCategoryRoute from "@/product_category/product_category.routes";
// import productSizeRoute from "@/product_size/product_size.routes";
// import productColorRoute from "@/product_color/product_color.routes";
// import productTagRoute from "@/product_tag/product_tag.routes";
const router = express.Router();

export default (): express.Router => {
  router.use("/users", userRoute);
  router.use("/auth", authRoute);
  router.use("/products", productRoute);
  router.use("/categories", categoryRoute);
  router.use("/sizes", sizeRoute);
  router.use("/colors", colorRoute);
  router.use("/tags", tagRoute);
  // router.use("/product-categories", productCategoryRoute);
  // router.use("/product-size", productSizeRoute);
  // router.use("/product-colors", productColorRoute);
  // router.use("/product-tags", productTagRoute);
  return router;
};
