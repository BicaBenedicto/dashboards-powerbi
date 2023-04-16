const Joi = require('joi');

const Usuarios = {
  forgetPassword: Joi.object({
    email: Joi.string().required().messages({
      'any.required': "Ops ocorreu um erro para encontrar o e-mail para recuperação, favor recarregar a página e tentar novamente"
    }),
  }),
  login: Joi.object({
    email: Joi.string().required().messages({
      'any.required': "Ops ocorreu um erro para encontrar o e-mail para o login, favor recarregar a página e tentar novamente"
    }),
    senha: Joi.string().required().messages({
      'any.required': "Ops ocorreu um erro para encontrar a senha para o login, favor recarregar a página e tentar novamente"
    }),
  }),
  update: Joi.object({
    id: Joi.any().required().messages({
      'any.required': "Ops ocorreu um erro para encontrar o id do usuário, favor recarregar a página e tentar novamente"
    }),
    nome: Joi.string().min(2).messages({
      'string.empty': `O "nome do usuário" não pode estar vazio`,
      'string.min': `O "nome do usuário" tem que ter no mínimo {#limit} caracteres`,
      'any.required': `O campo "nome do usuário" é necessário e não pode estar vazio`
    }),
    email: Joi.string().messages({
      'string.empty': `O "e-mail do usuário" não pode estar vazio`,
      'any.required': `O campo "e-mail do usuário" é necessário e não pode estar vazio`
    }),
    permissao: Joi.number(),
    senha: Joi.string().messages({
      'string.empty': `A "senha do usuário" não pode estar vazia`,
      'any.required': `O campo "senha do usuário" é necessário e não pode estar vazio`
    }),
    empresaId: Joi.number().messages({
      'number.empty': `O "Id da empresa do usuário" não pode estar vazio`,
      'any.required': `O campo "Id da empresa do usuário" é necessário e não pode estar vazio`
    }),
    status: Joi.boolean(),
  }),
  create: Joi.object({
    nome: Joi.string().min(2).required().messages({
      'string.empty': `O "nome do usuário" não pode estar vazio`,
      'string.min': `O "nome do usuário" tem que ter no mínimo {#limit} caracteres`,
      'any.required': `O campo "nome do usuário" é necessário e não pode estar vazio`
    }),
    email: Joi.string().required().messages({
      'string.empty': `O "e-mail do usuário" não pode estar vazio`,
      'any.required': `O campo "e-mail do usuário" é necessário e não pode estar vazio`
    }),
    permissao: Joi.number().required(),
    senha: Joi.string().messages({
      'string.empty': `A "senha do usuário" não pode estar vazia`,
      'any.required': `O campo "senha do usuário" é necessário e não pode estar vazio`
    }),
    empresaId: Joi.number().required().messages({
      'number.empty': `O "Id da empresa do usuário" não pode estar vazio`,
      'any.required': `O campo "Id da empresa do usuário" é necessário e não pode estar vazio`
    }),
    status: Joi.boolean(),
  }),
  remove: Joi.object({
    id: Joi.any().required().messages({
      'any.required': "Ops ocorreu um erro para encontrar o id do usuário, favor recarregar a página e tentar novamente"
    }),
  }),
};

module.exports = Usuarios;
