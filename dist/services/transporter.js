"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTransporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// Create a transport for sending email
const emailTransporter = (email, password) => {
    return nodemailer_1.default.createTransport({
        service: "Gmail", // You can use any email service
        auth: {
            user: email,
            pass: password,
        },
    });
};
exports.emailTransporter = emailTransporter;
