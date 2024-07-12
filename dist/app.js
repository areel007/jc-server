"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_1 = __importDefault(require("./routes/index"));
// Initialize app
const app = (0, express_1.default)();
// Config
dotenv_1.default.config({ path: "./config.env" });
// Cors
app.use((0, cors_1.default)());
// Middleware
if (process.env.NODE_ENV === "development") {
    app.use((0, morgan_1.default)("dev"));
}
// Body parser
app.use(express_1.default.json());
// Routes
app.use(index_1.default);
exports.default = app;