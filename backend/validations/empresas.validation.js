const Joi = require('joi');

const Empresas = {
  update: Joi.object({
    id: Joi.any().required().messages({
      'any.required': "Ops ocorreu um erro para encontrar o id da empresa, favor recarregar a página e tentar novamente",
    }),
    nome: Joi.string().min(2).messages({
      'string.empty': `O "nome da empresa" não pode estar vazio`,
      'string.min': `O "nome da empresa" tem que ter no mínimo {#limit} caracteres`,
      'any.required': `O campo "nome da empresa" é necessário e não pode estar vazio`
    }),
    cnpj: Joi.string().messages({
      'string.empty': `O "cnpj da empresa" não pode estar vazio`,
      'any.required': `O campo "cnpj da empresa" é necessário e não pode estar vazio`
    }),
    razaoSocial: Joi.string().messages({
      'string.empty': `A "razão social da empresa" não pode estar vazia`,
      'any.required': `O campo "razão social da empresa" é necessário e não pode estar vazio`
    }),
    responsaveis: Joi.array().items(Joi.object({
      nome: Joi.string().messages({
        'string.empty': `O(A) "nome do(a) responsável da empresa" não pode estar vazio`,
        'any.required': `O campo "nome do(a) responsável da empresa" é necessário e não pode estar vazio`
      }),
      email: Joi.string().messages({
        'string.empty': `O(A) "email do(a) responsável da empresa" não pode estar vazio`,
        'any.required': `O campo "email do(a) responsável da empresa" é necessário e não pode estar vazio`
      }),
      telefone: Joi.string().messages({
        'string.empty': `O(A) "telefone do(a) responsável da empresa" não pode estar vazio`,
        'any.required': `O campo "telefone do(a) responsável da empresa" é necessário e não pode estar vazio`
      }),
      id: Joi.any(),
    })),
    status: Joi.boolean().messages({
      'boolean.empty': `O "status da empresa" não pode estar vazio`,
      'any.required': `O campo "status do dashboard" é necessário e não pode estar vazio`
    }),
  }),
  create: Joi.object({
    nome: Joi.string().min(2).required().messages({
      'string.empty': `O "nome da empresa" não pode estar vazio`,
      'string.min': `O "nome da empresa" tem que ter no mínimo {#limit} caracteres`,
      'any.required': `O campo "nome da empresa" é necessário e não pode estar vazio`
    }),
    cnpj: Joi.string().required().messages({
      'string.empty': `O "cnpj da empresa" não pode estar vazio`,
      'any.required': `O campo "cnpj da empresa" é necessário e não pode estar vazio`
    }),
    razaoSocial: Joi.string().required().messages({
      'string.empty': `A "razão social da empresa" não pode estar vazia`,
      'any.required': `O campo "razão social da empresa" é necessário e não pode estar vazio`
    }),
    responsaveis: Joi.array().items(Joi.object({
      nome: Joi.string().required().messages({
        'string.empty': `O(A) "nome do(a) responsável da empresa" não pode estar vazio`,
        'any.required': `O campo "nome do(a) responsável da empresa" é necessário e não pode estar vazio`
      }),
      email: Joi.string().required().messages({
        'string.empty': `O(A) "email do(a) responsável da empresa" não pode estar vazio`,
        'any.required': `O campo "email do(a) responsável da empresa" é necessário e não pode estar vazio`
      }),
      telefone: Joi.string().required().messages({
        'string.empty': `O(A) "telefone do(a) responsável da empresa" não pode estar vazio`,
        'any.required': `O campo "telefone do(a) responsável da empresa" é necessário e não pode estar vazio`
      }),
      id: Joi.any(),
    })),
    status: Joi.boolean().messages({
      'boolean.empty': `O "status da empresa" não pode estar vazio`,
      'any.required': `O campo "status da empresa" é necessário e não pode estar vazio`
    }),
  }),
  remove: Joi.object({
    id: Joi.any().required().messages({
      'any.required': "Ops ocorreu um erro para encontrar o id da empresa, favor recarregar a página e tentar novamente",
    }) }),
};

module.exports = Empresas;
