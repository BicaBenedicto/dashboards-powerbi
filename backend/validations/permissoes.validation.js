const Joi = require('joi');

const Dashboards = {
  update: Joi.object({
    id: Joi.number().required(),
    nome: Joi.string().min(2),
    empresaId: Joi.number(),
    level: Joi.number(),
    status: Joi.boolean(),
    dashboards: Joi.array().items(Joi.any()),
  }),
  create: Joi.object({
    nome: Joi.string().min(2).required(),
    empresaId: Joi.number().required(),
    level: Joi.number().required(),
    status: Joi.boolean(),
    dashboards: Joi.array().items(Joi.any()),
  }),
  remove: Joi.object({
    id: Joi.number().required(),
  }),
};

module.exports = Dashboards;
