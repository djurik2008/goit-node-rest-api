import express from "express";
import authControllers from "../controllers/authControllers.js";
import {
  userSignupSchema,
  userSigninSchema,
  updateUserSubscriptionSchema,
} from "../schemas/usersSchemas.js";
import validateBody from "../decorators/validateBody.js";
import authenticate from "../middlewares/authenticate.js";

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

export default authRouter;