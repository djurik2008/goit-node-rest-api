import ctrlWrapper from "../../decorators/ctrlWrapper.js";
import { signup } from "./signup.js";
import { signin } from "./signin.js";
import { getCurrent } from "./getCurrent.js";
import { signout } from "./signout.js";
import { updateUserSubscription } from "./updateUserSubscription.js";
import { updateUserAvatar } from "./updateUserAvatar.js";
import { verify } from "./verify.js";
import { resendVerify } from "./resendVerify.js";

export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
  updateUserSubscription: ctrlWrapper(updateUserSubscription),
  updateUserAvatar: ctrlWrapper(updateUserAvatar),
  verify: ctrlWrapper(verify),
  resendVerify: ctrlWrapper(resendVerify),
};
