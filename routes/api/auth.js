const express = require("express");
const ctrl = require("../../controllers/auth.js");
const validateBody = require("../../middelwares/validateBody.js");
const { schemas } = require("../../models/user.js");
const authenticate = require("../../middelwares/authenticate.js");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
