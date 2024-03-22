import { Schema, model } from "mongoose";
import { handleSaveError, setUpdateSetting } from "./hooks.js";

const contactShema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

contactShema.post("save", handleSaveError);
contactShema.pre("findOneAndUpdate", setUpdateSetting);
contactShema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactShema);
export default Contact;
