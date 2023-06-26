const express = require("express");
const ctrl = require("../../controllers/auth.js");
const validateBody = require("../../middlewares/validateBody.js");
const { schemas } = require("../../models/user.js");
const authenticate = require("../../middlewares/authenticate.js");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/users",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  ctrl.updateSubscription
);

module.exports = router;
