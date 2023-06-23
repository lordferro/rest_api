const express = require("express");
const ctrl = require("../../controllers/auth.js");
const validateBody = require("../../middelwares/validateBody.js");
const { schemas } = require("../../models/user.js");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

module.exports = router;
