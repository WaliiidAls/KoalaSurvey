const Joi = require("@hapi/joi");

module.exports = {
  create: {
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(145).required(),
    }),
    auth: Joi.object({
      name: Joi.string(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(145).required(),
    }),
    edit: Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().min(6).max(145),
    }),
    employee: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).max(145),
    }),
  },
};
