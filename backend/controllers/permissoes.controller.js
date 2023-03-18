const { permissoes: Permissoes, dashboards_permissoes: DashboardsPermissoes } = require('../models');

const get = async (require, response, next) => {
  try {
    const query = require.query;

    const permissoes = await Permissoes.findAll({
      where: query,
      attributes: [
        'id',
        'nome',
        'empresaId',
        'status',
        'level',
        'createdAt',
        'updatedAt',
      ],
    });

    return response.status(200).json(permissoes.map((dash) => dash.dataValues));
  } catch (e) {
    return next(e);
  }
};

const update = async (require, response, next) => {
  try {
    const { id } = require.params;
    const { nome, empresaId, status, dashboards, level } = require.body;

    await Permissoes.update({ nome, empresaId, status, level }, { where: { id }});

    await DashboardsPermissoes.destroy({ where: { permissaoId: id } });

    if (dashboards?.length > 0) {
      
      await Promise.all(dashboards.map(async (dash) => {
        return await DashboardsPermissoes
          .findOrCreate({
            where: { dashboardId: dash.id, permissaoId: id },
            default: { dashboardId: dash.id, permissaoId: id },
          });
      }));
    }

    return response.status(200).json({ id, ...require.body });
  } catch (e) {
    return next(e);
  }
};

const create = async (require, response, next) => {
  try {
    const { nome, empresaId, status, dashboards, level } = require.body;

    const permissao = await Permissoes.create({ nome, empresaId, status, level });

    if (dashboards.length > 0) {
      await Promise.all(dashboards.map(async (dash) => await DashboardsPermissoes.create({ dashboardId: dash.id, permissaoId: permissao.dataValues.id })));
    }

    return response.status(201).json({...permissao.dataValues, dashboards});
  } catch (e) {
    return next(e);
  }
};

const remove = async (require, response, next) => {
  try {
    const { id } = require.params;
    await Permissoes.destroy({ where: { id }});
    return response.status(204).end();
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  get,
  create,
  update,
  remove,
};
