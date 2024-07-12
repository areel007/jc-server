import { body } from "express-validator";

export const validateForm = [
  body("branchName").isString(),
  body("firstname")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Firstname must be at least 3 characters long"),
  body("lastname")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Lastname must be at least 3 characters long"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("address").isString(),
  body("city").isString(),
  body("country").isString(),
  body("state").isString(),
  body("zipCode").isString(),
  body("ssn").isString(),
  body("mobile")
    .isMobilePhone("en-US")
    .withMessage("Please provide a valid mobile number"),
];
