import ctrlWrapper from "../../decorators/ctrlWrapper.js";

import { createContact } from "./createContact.js";
import { deleteContact } from "./deleteContact.js";
import { getAllContacts } from "./getAllContacts.js";
import { getOneContact } from "./getOneContact.js";
import { updateContact } from "./updateContact.js";

export default {
  createContact: ctrlWrapper(createContact),
  deleteContact: ctrlWrapper(deleteContact),
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  updateContact: ctrlWrapper(updateContact),
};
