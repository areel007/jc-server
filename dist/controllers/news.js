"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNews = void 0;
const newsapi_1 = __importDefault(require("newsapi"));
const config_1 = require("../config");
const newsapi = new newsapi_1.default(config_1.config.newsApiKey);
const getNews = async (req, res) => {
    try {
        const response = await newsapi.v2.topHeadlines({
            country: "us",
        });
        res.status(200).json(response.articles);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getNews = getNews;
