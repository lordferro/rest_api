const { HttpError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { User } = require("../models/users");

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
  const token =
    req.headers.authorization?.startsWith("Bearer") &&
    req.headers.authorization.split(" ")[1];

  if (!token) next(HttpError(401));
  try {
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) throw HttpError(401);

    req.user = user;
    next();
  } catch (error) {
    next(HttpError(401));
  }
};

module.exports = authenticate;
