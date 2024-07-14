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
const cloudinary_upload_1 = require("../services/cloudinary-upload");
const multer_1 = __importDefault(require("../services/multer"));
const config_1 = require("../config");
exports.submitForm = [
    ...validate_form_1.validateForm,
    (req, res, next) => {
        (0, multer_1.default)(req, res, (err) => {
            if (err) {
                return res.status(400).send("Error uploading files.");
            }
            next();
        });
    },
    async (req, res) => {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const files = req.files;
            if (!files.resume || !files.idCardFront || !files.idCardBack) {
                return res
                    .status(400)
                    .send("Resume, idCardFront and idCardBack are required.");
            }
            const resumeResult = await (0, cloudinary_upload_1.uploadToCloudinary)(files.resume[0].buffer, "resume");
            const idCardFront = await (0, cloudinary_upload_1.uploadToCloudinary)(files.idCardFront[0].buffer, "idCardFront");
            const idCardBack = await (0, cloudinary_upload_1.uploadToCloudinary)(files.idCardBack[0].buffer, "idCardBack");
            const { branchName, firstname, lastname, address, city, country, state, zipCode, ssn, mobile, email, } = req.body;
            console.log(branchName, firstname, lastname, address, city, country, state, zipCode, ssn, mobile, email);
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
                resume: resumeResult.secure_url,
                idCardFront: idCardFront.secure_url,
                idCardBack: idCardBack.secure_url,
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
        Email: ${email}
        resume: ${resumeResult.secure_url}
        idCardFront: ${idCardFront.secure_url}
        idCardBack: ${idCardBack.secure_url}
        `;
            const mailOptions = {
                from: config_1.config.emailUsername,
                to: config_1.config.emailReceiver,
                subject: "Form Submission from gatewayjobcenter",
                text: message,
            };
            (0, transporter_1.emailTransporter)(config_1.config.emailUsername, config_1.config.emailPassword).sendMail(mailOptions);
            await form.save();
            res.status(201).json(form);
        }
        catch (error) {
            console.error("Error registering user:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
];
