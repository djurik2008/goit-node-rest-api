import express from "express";
import authControllers from "../controllers/authControllers/index.js";
import {
  userSignupSchema,
  userSigninSchema,
  updateUserSubscriptionSchema,
  userEmailSchema,
} from "../schemas/usersSchemas.js";
import validateBody from "../decorators/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validateBody(userSignupSchema),
  authControllers.signup
);

authRouter.post(
  "/login",
  validateBody(userSigninSchema),
  authControllers.signin
);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/logout", authenticate, authControllers.signout);

authRouter.patch(
  "/",
  authenticate,
  validateBody(updateUserSubscriptionSchema),
  authControllers.updateUserSubscription
);

authRouter.patch(
  "/avatars",
  upload.single("avatar"),
  authenticate,
  authControllers.updateUserAvatar
);

authRouter.get("/verify/:verificationToken", authControllers.verify);

authRouter.post(
  "/verify",
  validateBody(userEmailSchema),
  authControllers.resendVerify
);

export default authRouter;
