const Joi = require('joi');

const Empresas = {
  update: Joi.object({
    id: Joi.number().required(),
    nome: Joi.string().min(2),
    cnpj: Joi.string(),
    razaoSocial: Joi.string(),
    responsaveis: Joi.array().items(Joi.object({
      nome: Joi.string(),
      email: Joi.string(),
      telefone: Joi.string(),
    })),
    status: Joi.boolean(),
  }),
  create: Joi.object({
    nome: Joi.string().min(2).required(),
    cnpj: Joi.string().required(),
    razaoSocial: Joi.string().required(),
    responsaveis: Joi.array().items(Joi.object({
      nome: Joi.string().required(),
      email: Joi.string().required(),
      telefone: Joi.string().required(),
    })),
    status: Joi.boolean(),
  }),
  remove: Joi.object({
    id: Joi.number().required(),
  }),
};

module.exports = Empresas;
