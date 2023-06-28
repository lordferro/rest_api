const Jimp = require("jimp");
const { HttpError } = require("../helpers");

const picturesManipulations = async (req, res, next) => {
  const { path } = req.file;

  Jimp.read(path, (err, pic) => {
    if (err) throw HttpError(400);
    pic.resize(250, Jimp.AUTO).write(path);
    next();
  });
};

module.exports = picturesManipulations;
