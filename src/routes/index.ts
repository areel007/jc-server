import { Router } from "express";
import form from "./form";

const router = Router();

router.use("/api", form);

export default router;
