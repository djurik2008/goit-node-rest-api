import Contact from "../models/Contact.js";

export const listContacts = () => Contact.find({}, "-createdAt -updatedAt");

export const getContactById = (contactId) => Contact.findById(contactId);

export const removeContact = async (contactId) =>
  Contact.findByIdAndDelete(contactId);

export const addContact = (data) => Contact.create(data);

export const updateContact = (id, data) => Contact.findByIdAndUpdate(id, data);
