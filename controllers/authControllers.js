import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs/promises";
import path from "path";
import gravatar from "gravatar";
import Jimp from "jimp";

import * as authServices from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const { JWT_SECRET } = process.env;

const avatarPath = path.resolve("public", "avatars");

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await authServices.findUser({ email });

  if (user) {
    throw HttpError(409, "Email is alredy in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const userAvatar = gravatar.url(email, { s: "250", d: "monsterid" });

  const newUser = await authServices.signup({
    ...req.body,
    avatarUrl: userAvatar,
    password: hashPassword,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await authServices.findUser({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const { _id: id } = user;
  const payload = {
    id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  await authServices.updateUser({ _id: id }, { token });

  res.json({
    token: token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { subscription, email } = req.user;
  res.json({
    email,
    subscription,
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;
  await authServices.updateUser({ _id }, { token: "" });
  res.status(204).json();
};

const updateUserSubscription = async (req, res, next) => {
  const { subscription: newSubscription } = req.body;
  const { subscription, _id: id } = req.user;
  if (newSubscription === subscription) {
    return next(HttpError(409, "Already on current subscription"));
  }
  await authServices.updateUser({ _id: id }, { subscription: newSubscription });

  res.json(`Success, your subscription has update to ${newSubscription}`);
};

const updateUserAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "File was not uploaded");
  }
  const { _id: id } = req.user;
  const { path: oldPath, filename } = req.file;
  const resizeAvatar = await Jimp.read(oldPath);
  resizeAvatar.resize(250, 250);
  await resizeAvatar.writeAsync(oldPath);
  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);
  const avatar = path.join("avatars", filename);
  await authServices.updateUser({ _id: id }, { avatarUrl: avatar });
  res.json({
    avatarURL: avatar,
  });
};

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
  updateUserAvatar: ctrlWrapper(updateUserAvatar),
};
