import HttpError from "../../helpers/HttpError.js";
import { findUser, updateUser } from "../../services/authServices.js";

export const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await findUser({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await updateUser({ _id: user._id }, { verify: true, verificationToken: "" });

  res.json({
    message: "Verification successful",
  });
};
