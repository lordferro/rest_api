const { Contact } = require("../models/contacts");
const { CtrlWrapper, HttpError } = require("../helpers");

const getAll = async (req, res, next) => {
  const result = await Contact.find();
  if (!result) {
    throw HttpError(404, "not found");
  }
  res.json(result);
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, "not found");
  }
  res.json(result);
};

const add = async (req, res, next) => {
  const result = await Contact.create(req.body);
  res.json(result);
};

const editById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "not found");
  }
  res.json(result);
};

const removeById = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, "not found");
  }
  res.json("Deleted.");
};
const updateFavorite = async (req, res, next) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "not found");
  }
  res.json(result);
};

module.exports = {
  getAll: CtrlWrapper(getAll),
  getById: CtrlWrapper(getById),
  add: CtrlWrapper(add),
  editById: CtrlWrapper(editById),
  removeById: CtrlWrapper(removeById),
  updateFavorite: CtrlWrapper(updateFavorite),
};
