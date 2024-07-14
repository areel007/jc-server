import { Router } from "express";
import form from "./form";
import news from "./news";

const router = Router();

router.use("/api", form);
router.use("/api", news);

export default router;
