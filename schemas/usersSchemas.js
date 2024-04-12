import Joi from "joi";
import { emailRegexp, subscriptionList } from "../constants/userConstants.js";

export const userSignupSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const updateUserSubscriptionSchema = Joi.object({
  subscription: Joi.string().valid(...subscriptionList),
});

export const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});
