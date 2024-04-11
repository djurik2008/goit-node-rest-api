import { updateUser } from "../../services/authServices.js";

export const signout = async (req, res) => {
  const { _id } = req.user;
  await updateUser({ _id }, { token: "" });
  res.status(204).json();
};
