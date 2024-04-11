import HttpError from "../../helpers/HttpError.js";
import { updateContactByFilter } from "../../services/contactsServices.js";

export const updateContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "Body must have at least one field");
  }
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await updateContactByFilter({ owner, _id: id }, req.body);
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json(result);
};
