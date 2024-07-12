import { Router } from "express";
import { upload } from "../middlewares/documents";
import { submitForm } from "../controllers/form";

const router = Router();

router
  .route("/form-submit")
  .post(
    upload.fields([{ name: "resume" }, { name: "certificate" }]),
    submitForm
  );

export default router;
