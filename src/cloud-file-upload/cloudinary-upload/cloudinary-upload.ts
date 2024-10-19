import cloudinary from "@/cloud-file-upload/cloudinary-upload/init";
import {
  UploadApiOptions,
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";

export default async (
  fileBuffer: Buffer,
  options: UploadApiOptions = {}
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        options,
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
      )
      .end(fileBuffer); // Send buffer to the stream
  });
};
