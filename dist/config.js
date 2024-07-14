"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
// src/config.ts
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables from .env file
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../config.env") });
// Export environment variables
exports.config = {
    port: process.env.PORT,
    databaseURL: process.env.DATABASE,
    databasePassword: process.env.DATABASE_PASSWORD,
    emailUsername: process.env.EMAIL_USERNAME,
    emailPassword: process.env.EMAIL_PASSWORD,
    emailReceiver: process.env.EMAIL_RECEIVER,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_CLOUD_API_SECRET,
    cloudinaryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
    newsApiKey: process.env.NEWS_API_KEY,
    node_env: process.env.NODE_ENV,
};
// Verify that environment variables are loaded
if (!exports.config.emailUsername ||
    !exports.config.emailPassword ||
    !exports.config.emailReceiver ||
    !exports.config.cloudinaryApiKey ||
    !exports.config.cloudinaryApiSecret ||
    !exports.config.cloudinaryCloudName ||
    !exports.config.port ||
    !exports.config.databaseURL ||
    !exports.config.databasePassword ||
    !exports.config.newsApiKey ||
    !exports.config.node_env) {
    throw new Error("Missing environment variables");
}
