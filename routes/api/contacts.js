const express = require("express");
const ctrl = require("../../controllers/contacts");
const { validateBody, isValidId, authenticate } = require("../../middelwares/");
const { schemas } = require("../../models/contacts");

const router = express.Router();

router.use(authenticate)

router.get("/", ctrl.getAll);

router.get("/:id", isValidId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.put("/:id", isValidId, validateBody(schemas.addSchema), ctrl.editById);

router.delete("/:id", isValidId, ctrl.removeById);

router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.favoriteSchema),
  ctrl.updateFavorite
);

module.exports = router;
