const Joi = require('joi');

const Dashboards = {
  update: Joi.object({
    id: Joi.number().required(),
    nome: Joi.string().min(2),
    url: Joi.string(),
    descricao: Joi.string(),
    empresaId: Joi.number(),
    status: Joi.boolean(),
  }),
  create: Joi.object({
    nome: Joi.string().min(2).required(),
    url: Joi.string().required(),
    descricao: Joi.string().required(),
    empresaId: Joi.number().required(),
    status: Joi.boolean(),
  }),
  remove: Joi.object({
    id: Joi.number().required(),
  }),
};

module.exports = Dashboards;
