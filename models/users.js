const { Schema, model } = require("mongoose");
const Joi = require("joi");
const subscriptionEnum = require("../constants/subscriptionEnum");
const { handleMongooseError } = require("../helpers");
const bcrypt = require("bcrypt");

const emailRegex =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const authSchema = new Schema(
  {
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: emailRegex,
      uniqe: true,
    },
    subscription: {
      type: String,
      enum: Object.values(subscriptionEnum),
      default: subscriptionEnum.STARTER,
    },
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);
authSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});
authSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegex),
  password: Joi.string().required().min(6),
  subscription: Joi.valid(...Object.values(subscriptionEnum)),
  token: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegex),
  password: Joi.string().required().min(6),
  newPassword: Joi.string().min(6),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.valid(...Object.values(subscriptionEnum)).required(),
});

// Custom method

authSchema.methods.checkPassword = (candidate, hash) =>
  bcrypt.compare(candidate, hash);

const User = model("user", authSchema);

const schemas = { registerSchema, loginSchema, subscriptionSchema };

module.exports = { User, schemas };
