"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const news_1 = require("../controllers/news");
const router = (0, express_1.Router)();
router.route("/news").get(news_1.getNews);
exports.default = router;
