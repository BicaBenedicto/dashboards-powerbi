
const Joi = require('joi');

const Empresas = {
  update: Joi.object({
    id: Joi.number().required(),
    nome: Joi.string().min(2),
    cnpj: Joi.string(),
    razaoSocial: Joi.string(),
    email: Joi.string(),
    responsavel: Joi.string(),
    emailResponsavel: Joi.string(),
    telefoneResponsavel: Joi.string(),
    dashboardLink: Joi.string(),
    status: Joi.string(),
  }),
  create: Joi.object({
    nome: Joi.string().min(2).required(),
    cnpj: Joi.string().required(),
    razaoSocial: Joi.string().required(),
    email: Joi.string().required(),
    responsavel: Joi.string().required(),
    emailResponsavel: Joi.string().required(),
    telefoneResponsavel: Joi.string(),
    dashboardLink: Joi.string(),
    status: Joi.string(),
  }),
  remove: Joi.object({
    id: Joi.number().required(),
  }),
};

module.exports = Empresas;
