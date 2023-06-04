const Joi = require("joi");

const addContacts = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required(),
});

module.exports = addContacts;
