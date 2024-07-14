"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const form_1 = __importDefault(require("./form"));
const news_1 = __importDefault(require("./news"));
const router = (0, express_1.Router)();
router.use("/api", form_1.default);
router.use("/api", news_1.default);
exports.default = router;
