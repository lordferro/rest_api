const express = require("express");
const ctrl = require("../../controllers/users.js");
const {
  validateBody,
  authenticate,
  uploadUserAvatar,
} = require("../../middlewares/");
const { schemas } = require("../../models/users.js");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.get('/verify/:verificationToken', ctrl.verifyEmail)

router.post("/verify", validateBody(schemas.verifyEmail), ctrl.resendVerificationEmail)

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/update",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  ctrl.updateSubscription
);

router.patch(
  "/changePassword",
  authenticate,
  validateBody(schemas.loginSchema),
  ctrl.changePassword
);

router.patch("/avatars", authenticate, uploadUserAvatar, ctrl.updateAvatar);

module.exports = router;
