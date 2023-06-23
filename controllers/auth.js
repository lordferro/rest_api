const { CtrlWrapper, HttpError } = require("../helpers");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) throw HttpError(409, "email is already in use");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({ ...req.body, password: hashedPassword });

  console.log(newUser._id);

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

module.exports = {
  register: CtrlWrapper(register),
  login: CtrlWrapper(login),
  logout: CtrlWrapper(logout),
  getCurrent: CtrlWrapper(getCurrent),
};