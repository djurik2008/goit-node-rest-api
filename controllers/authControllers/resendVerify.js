import HttpError from "../../helpers/HttpError.js";
import { findUser } from "../../services/authServices.js";
import sendEmail from "../../helpers/sendEmail.js";

const { PROJECT_URL } = process.env;

export const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await findUser({ email });
  if (!user) {
    throw HttpError(404, "Email not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${PROJECT_URL}/api/auth/verify/${user.verificationToken}">Click verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.json({
    message: "Verification email sent",
  });
};
