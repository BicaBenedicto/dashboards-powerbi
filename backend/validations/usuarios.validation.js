const Joi = require('joi');

const Usuarios = {
  login: Joi.object({
    email: Joi.string().required(),
    senha: Joi.string().required(),
  }),
  update: Joi.object({
    id: Joi.number().required(),
    nome: Joi.string().min(2),
    email: Joi.string(),
    permissao: Joi.number(),
    senha: Joi.string(),
    empresaId: Joi.number(),
    status: Joi.boolean(),
  }),
  create: Joi.object({
    nome: Joi.string().min(2).required(),
    email: Joi.string().required(),
    permissao: Joi.number().required(),
    senha: Joi.string(),
    empresaId: Joi.number().required(),
    status: Joi.boolean(),
  }),
  remove: Joi.object({
    id: Joi.number().required(),
  }),
};

module.exports = Usuarios;
