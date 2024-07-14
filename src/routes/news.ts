import { Router } from "express";
import { getNews } from "../controllers/news";

const router = Router();

router.route("/news").get(getNews);

export default router;
