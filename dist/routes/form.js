"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const form_1 = require("../controllers/form");
const router = (0, express_1.Router)();
router.route("/form-submit").post(form_1.submitForm);
exports.default = router;
