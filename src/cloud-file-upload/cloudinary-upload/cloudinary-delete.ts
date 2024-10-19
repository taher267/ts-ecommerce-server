import cloudinary from "@/cloud-file-upload/cloudinary-upload/init";

import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";

// Function to delete a file from Cloudinary using public_id
export default async (publicId: string): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(
      publicId,
      (
        error: UploadApiErrorResponse | null,
        result: UploadApiResponse | undefined
      ) => {
        if (error) {
          reject(error);
        } else {
          resolve(result as UploadApiResponse);
        }
      }
    );
  });
};
