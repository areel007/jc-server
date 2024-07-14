"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
// import dotenv from "dotenv";
const index_1 = __importDefault(require("./routes/index"));
// configure dotenv
const config_1 = require("./config");
// Initialize app
const app = (0, express_1.default)();
// Config
// dotenv.config({ path: "./config.env" });
// Cors
app.use((0, cors_1.default)());
// Middleware
if (config_1.config.node_env === "development") {
    app.use((0, morgan_1.default)("dev"));
}
// Body parser
app.use(express_1.default.json());
// Routes
app.use(index_1.default);
exports.default = app;
// DATABASE=mongodb+srv://gfequitygroupjobcenter:<password>@cluster0.jiubzzf.mongodb.net/gf-equity-group-db
