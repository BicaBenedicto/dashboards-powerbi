const { usuarios: Usuarios } = require('../models');

const get = async (require, response, _next) => {
  const query = require.query;

  const usuarios = await Usuarios.findAll({
    where: query,
    attributes: [
      'id',
      'nome',
      'email',
      'permissao',
      'status',
      'createdAt',
      'updatedAt',
    ],
  });

  return response.status(200).json(usuarios);
};

const update = async (require, response, _next) => {
  const { id } = require.params;
  const { body } = require;

  await Usuarios.update(body, { where: { id }});

  return response.status(200).json({ id, ...body });
};

const create = async (require, response, next) => {
  const { body } = require;

  const comment = await Usuarios.create(body);

  return response.status(201).json(comment);
};

const remove = async (require, response, _next) => {
  const { id } = require.params;
  await Usuarios.destroy({ where: { id }});
  return response.status(204).end();
};

module.exports = {
  get,
  create,
  update,
  remove,
};
