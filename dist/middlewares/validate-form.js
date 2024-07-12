"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateForm = void 0;
const express_validator_1 = require("express-validator");
exports.validateForm = [
    (0, express_validator_1.body)("branchName").isString(),
    (0, express_validator_1.body)("firstname")
        .isString()
        .isLength({ min: 3 })
        .withMessage("Firstname must be at least 3 characters long"),
    (0, express_validator_1.body)("lastname")
        .isString()
        .isLength({ min: 3 })
        .withMessage("Lastname must be at least 3 characters long"),
    (0, express_validator_1.body)("email").isEmail().withMessage("Please provide a valid email"),
    (0, express_validator_1.body)("address").isString(),
    (0, express_validator_1.body)("city").isString(),
    (0, express_validator_1.body)("country").isString(),
    (0, express_validator_1.body)("state").isString(),
    (0, express_validator_1.body)("zipCode").isString(),
    (0, express_validator_1.body)("ssn").isString(),
    (0, express_validator_1.body)("mobile")
        .isMobilePhone("en-US")
        .withMessage("Please provide a valid mobile number"),
];
