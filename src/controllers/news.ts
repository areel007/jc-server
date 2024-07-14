import { Request, Response } from "express";
import NewsAPI from "newsapi";
import { config } from "../config";

const newsapi = new NewsAPI(config.newsApiKey);

export const getNews = async (req: Request, res: Response) => {
  try {
    const response = await newsapi.v2.topHeadlines({
      country: "us",
    });
    res.status(200).json(response.articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
