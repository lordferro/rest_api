const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fse = require("fs-extra");
const { nanoid } = require("nanoid");
const { HttpError } = require("../helpers");

class ImageService {
  static upload(name) {
    const multerStorage = multer.memoryStorage();

    const multerFilter = (req, file, cb) => {
      if (file.mimetype.startsWith("image")) {
        cb(null, true);
      } else {
        cb(HttpError(400, "please upload image"), false);
      }
    };
    return multer({
      storage: multerStorage,
      fileFilter: multerFilter,
    }).single(name);
  }

  static async save(file, options, ...pathSegments) {
    const fileName = `${nanoid()}.jpeg`;
    const fullFilePath = path.join(process.cwd(), "public", ...pathSegments);

    await fse.ensureDir(fullFilePath);
    await sharp(file.buffer)
      .resize(options || { height: 500, width: 500 })
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(path.join(fullFilePath, fileName));

    return path.join(...pathSegments, fileName);
  }
}

module.exports = ImageService;
