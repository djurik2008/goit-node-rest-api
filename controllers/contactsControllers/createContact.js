import { addContact } from "../../services/contactsServices.js";

export const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await addContact({ ...req.body, owner });
  res.json(result);
};
