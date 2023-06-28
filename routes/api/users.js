const express = require("express");
const ctrl = require("../../controllers/users.js");
const {validateBody, authenticate,upload, picturesManipulations} = require("../../middlewares/");
const { schemas } = require("../../models/users.js");


const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch(
  "/update",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  ctrl.updateSubscription
);

router.patch("/avatars", authenticate, upload.single("avatar"), picturesManipulations, ctrl.updateAvatar)

module.exports = router;
