const { CtrlWrapper, HttpError } = require("../helpers");
const { User } = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");

const avatarPath = path.join(__dirname, "../", "public", "avatars");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) throw HttpError(409, "email is already in use");

  const hashedPassword = await bcrypt.hash(password, 10);

  const avatarURL = gravatar.url(email);

  await User.create({ ...req.body, password: hashedPassword, avatarURL });

  res.status(201).json({ email });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw HttpError(400);

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) throw HttpError(401);

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({ token });
};

const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).json({});
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json({ email, subscription });
};

const updateSubscription = async (req, res) => {
  const { subscription: newSubscription } = req.body;
  const { _id } = req.user;
  const { subscription } = req.user;

  if (newSubscription === subscription)
    throw HttpError(400, "This is current subscription");

  const result = await User.findByIdAndUpdate(
    _id,
    {
      subscription: newSubscription,
    },
    { new: true }
  );

  res.status(200).json({ result });
};

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempPath, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarPath, filename);

  await fs.rename(tempPath, resultUpload);

  const avatarURL = path.join("avatars", filename);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = {
  register: CtrlWrapper(register),
  login: CtrlWrapper(login),
  logout: CtrlWrapper(logout),
  getCurrent: CtrlWrapper(getCurrent),
  updateSubscription: CtrlWrapper(updateSubscription),
  updateAvatar: CtrlWrapper(updateAvatar),
};
