const Joi = require('joi');

const Dashboards = {
  update: Joi.object({
    id: Joi.any().required().messages({
      'any.required': "Ops ocorreu um erro para encontrar o id do dashboard, favor recarregar a página e tentar novamente"
    }),
    nome: Joi.string().min(2).messages({
      'string.empty': `O "nome do dashboard" não pode estar vazio`,
      'string.min': `O "nome do dashboard" tem que ter no mínimo {#limit} caracteres`,
      'any.required': `O campo "nome do dashboard" é necessário e não pode estar vazio`
    }),
    url: Joi.string().messages({
      'string.empty': `O "url do dashboard" não pode estar vazio`,
      'any.required': `O campo "url do dashboard" é necessário e não pode estar vazio`
    }),
    descricao: Joi.string().max(500).messages({
      'string.max': 'A "descrição do dashboard" pode ter no máximo 500 caracteres',
      'string.empty': `A "descrição do dashboard" não pode estar vazia`,
      'any.required': `O campo "descrição do dashboard" é necessário e não pode estar vazio`
    }),
    empresaId: Joi.number().messages({
      'number.empty': `O "Id da empresa do dashboard" não pode estar vazio`,
      'any.required': `O campo "Id da empresa do dashboard" é necessário e não pode estar vazio`
    }),
    status: Joi.boolean().messages({
      'boolean.empty': `O "status do dashboard" não pode estar vazio`,
      'any.required': `O campo "status do dashboard" é necessário e não pode estar vazio`
    }),
  }),
  create: Joi.object({
    nome: Joi.string().min(2).required().messages({
      'string.empty': `O "nome do dashboard" não pode estar vazio`,
      'string.min': `O "nome do dashboard" tem que ter no mínimo {#limit} caracteres`,
      'any.required': `O campo "nome do dashboard" é necessário e não pode estar vazio`
    }),
    url: Joi.string().required().messages({
      'string.empty': `O "url do dashboard" não pode estar vazio`,
      'any.required': `O campo "url do dashboard" é necessário e não pode estar vazio`
    }),
    descricao: Joi.string().max(500).required().messages({
      'string.max': 'A "descrição do dashboard" pode ter no máximo 500 caracteres',
      'string.empty': `A "descrição do dashboard" não pode estar vazia`,
      'any.required': `O campo "descrição do dashboard" é necessário e não pode estar vazio`
    }),
    empresaId: Joi.number().required().messages({
      'number.empty': `O "id da empresa do dashboard" não pode estar vazio`,
      'any.required': `O campo "id da empresa do dashboard" é necessário e não pode estar vazio`
    }),
    status: Joi.boolean().messages({
      'boolean.empty': `O "status do dashboard" não pode estar vazio`,
      'any.required': `O campo "status do dashboard" é necessário e não pode estar vazio`
    }),
  }),
  remove: Joi.object({
    id: Joi.any().required().messages({
      'any.required': "Ops ocorreu um erro para encontrar o id do dashboard, favor recarregar a página e tentar novamente"
    }),
  }),
};

module.exports = Dashboards;
