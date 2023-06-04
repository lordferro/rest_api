const express = require("express");
const schema = require("../../schemas");
const validateBody = require("../../middelwares/validateBody");
const {
  getAll,
  getById,
  add,
  editById,
  deleteById,
} = require("../../controllers/contacts");
const CtrlWrapper = require("../../helpers/CtrlWrapper");

const router = express.Router();

router.get("/", CtrlWrapper(getAll));

router.get("/:id", CtrlWrapper(getById));

router.post("/", validateBody(schema.addContacts), CtrlWrapper(add));

router.delete("/:id", CtrlWrapper(deleteById));

router.put("/:id", validateBody(schema.addContacts), CtrlWrapper(editById));

module.exports = router;
