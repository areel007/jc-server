import express from "express";
import cors from "cors";
import morgan from "morgan";
// import dotenv from "dotenv";
import routes from "./routes/index";

// configure dotenv
import { config } from "./config";

// Initialize app
const app = express();

// Config
// dotenv.config({ path: "./config.env" });

// Cors
app.use(cors());

// Middleware
if (config.node_env === "development") {
  app.use(morgan("dev"));
}

// Body parser
app.use(express.json());

// Routes
app.use(routes);

export default app;

// DATABASE=mongodb+srv://gfequitygroupjobcenter:<password>@cluster0.jiubzzf.mongodb.net/gf-equity-group-db
