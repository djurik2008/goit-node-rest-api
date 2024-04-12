import bcrypt from "bcrypt";
import gravatar from "gravatar";
import { nanoid } from "nanoid";
import HttpError from "../../helpers/HttpError.js";
import { findUser, signupUser } from "../../services/authServices.js";
import sendEmail from "../../helpers/sendEmail.js";

const { PROJECT_URL } = process.env;

export const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await findUser({ email });

  if (user) {
    throw HttpError(409, "Email is alredy in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const userAvatar = gravatar.url(email, { s: "250", d: "wavatar" });
  const verificationToken = nanoid();

  const newUser = await signupUser({
    ...req.body,
    avatarUrl: userAvatar,
    password: hashPassword,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${PROJECT_URL}/api/users/verify/${verificationToken}">Click verify email</a>`,
  };

  sendEmail(verifyEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};
