const { empresas: Empresas } = require('../models');

const get = async (require, response, _next) => {
  const query = require.query;

  const empresas = await Empresas.findAll({
    where: query,
    attributes: [
      'id',
      'nome',
      'cnpj',
      'razaoSocial',
      'email',
      'responsavel',,
      'emailResponsavel',,
      'telefoneResponsavel',,
      'dashboardLink',,
      'status',
      'createdAt',
      'updatedAt',
    ],
  });

  return response.status(200).json(empresas);
};

const update = async (require, response, _next) => {
  const { id } = require.params;
  const { body } = require;

  await Empresas.update(body, { where: { id }});

  return response.status(200).json({ id, ...body });
};

const create = async (require, response, next) => {
  const { body } = require;

  const comment = await Empresas.create(body);

  return response.status(201).json(comment);
};

const remove = async (require, response, _next) => {
  const { id } = require.params;
  await Empresas.destroy({ where: { id }});
  return response.status(204).end();
};

module.exports = {
  get,
  create,
  update,
  remove,
};
