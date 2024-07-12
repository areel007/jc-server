import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Form from "../models/form";
import { validateForm } from "../middlewares/validate-form";
// import { emailTransporter } from "../services/transporter";
import nodemailer from "nodemailer";
import { emailTransporter } from "../services/transporter";

export const submitForm = [
  ...validateForm,
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const {
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
      } = req.body;

      const form = new Form({
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

      emailTransporter(
        process.env.EMAIL_USERNAME as string,
        process.env.EMAIL_PASSWORD as string
      ).sendMail(mailOptions);

      await form.save();

      res.status(201).json(form);
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];
