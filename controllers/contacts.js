const { HttpError } = require("../helpers");
const contacts = require("../models/contacts");

const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw HttpError(404, "not found");
  }
  res.status(200).json(result);
};

const add = async (req, res, next) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const editById = async (req, res, next) => {
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, "not found");
  }
  res.status(200).json(result);
};

const deleteById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, "not found");
    }
    res.status(200).json({ message: "delete success" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, add, editById, deleteById };
