import express from "express";
const router = express.Router();
import { imageUpload } from "@/file/controllers";
router.post(
  "/", // validations.isValidUploadFile,
  imageUpload
);
export default router;
