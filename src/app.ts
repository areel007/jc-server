import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import routes from "./routes/index";

// Initialize app
const app = express();

// Config
dotenv.config({ path: "./config.env" });

// Cors
app.use(cors());

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Body parser
app.use(express.json());

// Routes
app.use(routes);

export default app;
