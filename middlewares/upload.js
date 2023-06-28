const multer = require("multer");
const path = require("path");
const {nanoid} = require("nanoid");
const { HttpError } = require("../helpers");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
  destination: tempDir,
  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];

    cb(null, `${req.user.id}-${nanoid()}.${extension}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true)
  } else {
    cb(HttpError(400, "please upload image"), false)
  }
};

const upload = multer({
  storage: multerConfig,
  fileFilter: multerFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
}).single("avatar");

module.exports = upload;
