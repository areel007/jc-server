import nodemailer from "nodemailer";

// Create a transport for sending email
export const emailTransporter = (email: string, password: string) => {
  return nodemailer.createTransport({
    service: "Gmail", // You can use any email service
    auth: {
      user: email,
      pass: password,
    },
  });
};
