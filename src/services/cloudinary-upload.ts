import streamifier from "streamifier";
import cloudinary from "../services/cloudinary-config";

export interface CloudinaryUploadResponse {
  secure_url: string;
  // Add other properties as needed
}

export const uploadToCloudinary = (
  fileBuffer: Buffer,
  fileType: string
): Promise<CloudinaryUploadResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result as CloudinaryUploadResponse);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};
