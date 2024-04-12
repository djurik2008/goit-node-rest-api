import User from "../models/User.js";

export const signupUser = (data) => User.create(data);
export const findUser = (findQuery) => User.findOne(findQuery);
export const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);
