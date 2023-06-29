const { CtrlWrapper, HttpError, sendVerification } = require("../helpers");
const { User } = require("../models/users");
const jwt = require("jsonwebtoken");
// const path = require("path");
// const fs = require("fs/promises");
const ImageService = require("../services/imageService");
const { nanoid } = require("nanoid");

const { SECRET_KEY, BASE_URL } = process.env;

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) throw HttpError(409, "email is already in use");

  const verificationToken = nanoid();
  const emailForVerification = {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click for email verification</a>`,
  };

  await sendVerification(emailForVerification);

  await User.create({ ...req.body, password, verificationToken });

  res.status(201).json({ email });
};

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) throw HttpError(404, "User not found");

  await User.findByIdAndUpdate(user._id, {
    verificationToken: null,
    verify: true,
  });

  res.json({
    message: "Verification successful",
  });
};

const resendVerificationEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw HttpError(404, "User not found");
  if (user.verify) throw HttpError(400, "Verification has already been passed");

  const emailForVerification = {
    to: email,
    subject: "Verify your email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click for email verification</a>`,
  };

  await sendVerification(emailForVerification);

  res.json({ message: "Verification email sent" });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw HttpError(400);

  if (!user.verify) throw HttpError(401, "email is not verified");

  if (!(await user.checkPassword(password, user.password)))
    throw HttpError(401, "wrong credentials");

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

/**
 * change subscription of currently logged in user
 */
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

const updateAvatar = async (req, res, next) => {
  const { user, file } = req;

  if (file) {
    user.avatarURL = await ImageService.save(
      file,
      { width: 250, height: 250 },
      "avatars"
    );
  }

  const avatarURL = await user.save();
  res.json({ avatarURL });
};

const changePassword = async (req, res) => {
  const { password, newPassword } = req.body;

  const user = await User.findById(req.user.id);

  if (!(await user.checkPassword(password, user.password)))
    throw HttpError(401, "wrong credentials");

  user.password = newPassword;
  await user.save();
  console.log(user);

  res.json({ message: "password changed" });
};

module.exports = {
  register: CtrlWrapper(register),
  login: CtrlWrapper(login),
  logout: CtrlWrapper(logout),
  getCurrent: CtrlWrapper(getCurrent),
  /**
   * change subscription of currently logged in user
   */
  updateSubscription: CtrlWrapper(updateSubscription),
  updateAvatar: CtrlWrapper(updateAvatar),
  changePassword: CtrlWrapper(changePassword),
  verifyEmail: CtrlWrapper(verifyEmail),
  resendVerificationEmail: CtrlWrapper(resendVerificationEmail),
};
