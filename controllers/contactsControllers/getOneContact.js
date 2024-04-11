import HttpError from "../../helpers/HttpError.js";
import { getContactByFilter } from "../../services/contactsServices.js";

export const getOneContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await getContactByFilter({ owner, _id: id });
  if (!result) {
    throw HttpError(404, `Contact with id: ${id} not found`);
  }
  res.json(result);
};
