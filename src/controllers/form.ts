import { Request, Response } from "express";
import { validationResult } from "express-validator";
import Form from "../models/form";
import { validateForm } from "../middlewares/validate-form";
import { emailTransporter } from "../services/transporter";
import { uploadToCloudinary } from "../services/cloudinary-upload";
import upload from "../services/multer";
import { config } from "../config";

export const submitForm = [
  ...validateForm,
  (req: Request, res: Response, next: Function) => {
    upload(req, res, (err: any) => {
      if (err) {
        return res.status(400).send("Error uploading files.");
      }
      next();
    });
  },
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      if (!files.resume || !files.idCardFront || !files.idCardBack) {
        return res
          .status(400)
          .send("Resume, idCardFront and idCardBack are required.");
      }

      const resumeResult = await uploadToCloudinary(
        files.resume[0].buffer,
        "resume"
      );
      const idCardFront = await uploadToCloudinary(
        files.idCardFront[0].buffer,
        "idCardFront"
      );

      const idCardBack = await uploadToCloudinary(
        files.idCardBack[0].buffer,
        "idCardBack"
      );

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

      console.log(
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
        email
      );

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
        Email: ${email}`;

      const mailOptions = {
        from: config.emailUsername,
        to: config.emailReceiver,
        subject: "Form Submission from gatewayjobcenter",
        text: message,
      };

      emailTransporter(config.emailUsername, config.emailPassword).sendMail(
        mailOptions
      );

      await form.save();

      res.status(201).json(form);
    } catch (error) {
      console.error("Error registering user:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];
