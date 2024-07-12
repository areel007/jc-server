"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitForm = void 0;
const express_validator_1 = require("express-validator");
const form_1 = __importDefault(require("../models/form"));
const validate_form_1 = require("../middlewares/validate-form");
const transporter_1 = require("../services/transporter");
exports.submitForm = [
    ...validate_form_1.validateForm,
    async (req, res) => {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const { branchName, firstname, lastname, address, city, country, state, zipCode, ssn, mobile, email, } = req.body;
            const form = new form_1.default({
                branchName,
                firstname,
                lastname,
                address,
                city,
                country,
                state,
                zipCode,
                ssn,
                mobile,
                email,
            });
            // send the email
            const message = `
        Branch Name: ${branchName}
        Firstname: ${firstname}
        Lastname: ${lastname}
        Address: ${address}
        City: ${city}
        Country: ${country}
        State: ${state}
        ZipCode: ${zipCode}
        SSN: ${ssn}
        Mobile: ${mobile}
        Email: ${email}`;
            const mailOptions = {
                from: process.env.EMAIL_USERNAME,
                to: "delzmiyaki@gmail.com",
                subject: "Form Submission from gatewayjobcenter",
                text: message,
            };
            // Create a transport for sending email
            // const emailTransporter = nodemailer.createTransport({
            //   service: "Gmail", // You can use any email service
            //   auth: {
            //     user: process.env.EMAIL_USERNAME,
            //     pass: process.env.EMAIL_PASSWORD,
            //   },
            // });
            (0, transporter_1.emailTransporter)(process.env.EMAIL_USERNAME, process.env.EMAIL_PASSWORD).sendMail(mailOptions);
            await form.save();
            res.status(201).json(form);
        }
        catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
];
