
const Joi = require('joi');

const Usuarios = {
  update: Joi.object({
    id: Joi.number().required(),
    nome: Joi.string().min(2),
    email: Joi.string(),
    permissao: Joi.string(),
    status: Joi.string(),
  }),
  create: Joi.object({
    nome: Joi.string().min(2).required(),
    email: Joi.string().required(),
    permissao: Joi.string().required(),
    status: Joi.string(),
  }),
  remove: Joi.object({
    id: Joi.number().required(),
  }),
};

module.exports = Usuarios;
