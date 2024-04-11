import nodemailer from "nodemailer";
import "dotenv/config";

const { UKRNET_API_KEY, EMAIL_SENDER } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_SENDER,
    pass: UKRNET_API_KEY,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (data) => {
  const email = { ...data, from: EMAIL_SENDER };
  return transport.sendMail(email);
};

export default sendEmail;
