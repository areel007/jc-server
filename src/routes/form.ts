import { Router } from "express";
import { submitForm } from "../controllers/form";

const router = Router();

router.route("/form-submit").post(submitForm);

export default router;
