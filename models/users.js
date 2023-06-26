const { Schema, model } = require("mongoose");
const Joi = require("joi");
const subscriptionEnum = require("../constants/subscriptionEnum");
const { handleMongooseError } = require("../helpers");

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
});

const subscriptionSchema = Joi.object({
  subscription: Joi.valid(...Object.values(subscriptionEnum)),
});

const User = model("user", authSchema);

const schemas = { registerSchema, loginSchema, subscriptionSchema };

module.exports = { User, schemas };
