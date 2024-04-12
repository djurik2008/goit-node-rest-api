import HttpError from "../../helpers/HttpError.js";
import { removeContactByFilter } from "../../services/contactsServices.js";

export const deleteContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await removeContactByFilter({
    owner,
    _id: id,
  });
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json(result);
};
