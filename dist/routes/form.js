"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const documents_1 = require("../middlewares/documents");
const form_1 = require("../controllers/form");
const router = (0, express_1.Router)();
router
    .route("/form-submit")
    .post(documents_1.upload.fields([{ name: "resume" }, { name: "certificate" }]), form_1.submitForm);
exports.default = router;
