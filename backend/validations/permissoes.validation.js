const Joi = require('joi');

const Dashboards = {
  update: Joi.object({
    id: Joi.any().required().messages({
      'any.required': "Ops ocorreu um erro para encontrar o id da permissão, favor recarregar a página e tentar novamente"
    }),
    nome: Joi.string().min(2).messages({
      'string.empty': `O "nome da permissão" não pode estar vazio`,
      'string.min': `O "nome da permissão" tem que ter no mínimo {#limit} caracteres`,
      'any.required': `O campo "nome da permissão" é necessário e não pode estar vazio`
    }),
    empresaId: Joi.number().messages({
      'number.empty': `O "Id da empresa da permissão" não pode estar vazio`,
      'any.required': `O campo "Id da empresa da permissão" é necessário e não pode estar vazio`
    }),
    level: Joi.number().messages({
      'number.empty': `O "nível da permissão" não pode estar vazio`,
      'any.required': `O campo "nível da permissão" é necessário e não pode estar vazio`
    }),
    status: Joi.boolean(),
    dashboards: Joi.array().items(Joi.any()),
  }),
  create: Joi.object({
    nome: Joi.string().min(2).required().messages({
      'string.empty': `O "nome da permissão" não pode estar vazio`,
      'string.min': `O "nome da permissão" tem que ter no mínimo {#limit} caracteres`,
      'any.required': `O campo "nome da permissão" é necessário e não pode estar vazio`
    }),
    empresaId: Joi.number().required().messages({
      'number.empty': `O "Id da empresa da permissão" não pode estar vazio`,
      'any.required': `O campo "Id da empresa da permissão" é necessário e não pode estar vazio`
    }),
    level: Joi.number().required().messages({
      'number.empty': `O "nível da permissão" não pode estar vazio`,
      'any.required': `O campo "nível da permissão" é necessário e não pode estar vazio`
    }),
    status: Joi.boolean(),
    dashboards: Joi.array().items(Joi.any()),
  }),
  remove: Joi.object({
    id: Joi.any().required().messages({
      'any.required': "Ops ocorreu um erro para encontrar o id da permissão, favor recarregar a página e tentar novamente"
    }),
  }),
};

module.exports = Dashboards;
