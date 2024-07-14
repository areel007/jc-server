// src/config.ts
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../config.env") });

// Export environment variables
export const config = {
  port: process.env.PORT as string,
  databaseURL: process.env.DATABASE as string,
  databasePassword: process.env.DATABASE_PASSWORD as string,
  emailUsername: process.env.EMAIL_USERNAME as string,
  emailPassword: process.env.EMAIL_PASSWORD as string,
  emailReceiver: process.env.EMAIL_RECEIVER as string,
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY as string,
  cloudinaryApiSecret: process.env.CLOUDINARY_CLOUD_API_SECRET as string,
  cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME as string,
  newsApiKey: process.env.NEWS_API_KEY as string,
  node_env: process.env.NODE_ENV as string,
};

// Verify that environment variables are loaded
if (
  !config.emailUsername ||
  !config.emailPassword ||
  !config.emailReceiver ||
  !config.cloudinaryApiKey ||
  !config.cloudinaryApiSecret ||
  !config.cloudinaryCloudName ||
  !config.port ||
  !config.databaseURL ||
  !config.databasePassword ||
  !config.newsApiKey ||
  !config.node_env
) {
  throw new Error("Missing environment variables");
}
