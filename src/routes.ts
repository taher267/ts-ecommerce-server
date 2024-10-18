import express from "express";
import userRoute from "@/user/user.route";
import authRoute from "@/auth/auth.route";
import productRoute from "@/product/product.route";
// import fileUpload from "./fileUpload/fileUpload.route";
const router = express.Router();

export default (): express.Router => {
  router.use("/users", userRoute);
  router.use("/auth", authRoute);
  // router.use("/files", fileUpload);
  router.use("/products", productRoute);
  return router;
};
