const { dashboards: Dashboards, dashboards_permissoes: DashboardsPermissoes } = require('../models');

const get = async (require, response, next) => {
  try {
    const query = require.query;

    const dashboards = await Dashboards.findAll({
      where: query,
      attributes: [
        'id',
        'nome',
        'url',
        'descricao',
        'empresaId',
        'status',
        'createdAt',
        'updatedAt',
      ],
    });

    const dashboardsComPermissoes = await Promise.all(
      dashboards.map(async (dash) => ({...dash.dataValues, permissoes: await DashboardsPermissoes.findAll({
        where: { dashboardId: dash.id },
        attributes: [
          'permissaoId',
        ],
      }),
    })));

    return response.status(200).json(dashboardsComPermissoes);
  } catch (e) {
    return next(e);
  }
};

const update = async (require, response, next) => {
  try {
    const { id } = require.params;
    const { body } = require;

    await Dashboards.update(body, { where: { id }});

    return response.status(200).json({ id, ...body });
  } catch (e) {
    return next(e);
  }
};

const create = async (require, response, next) => {
  try {
    const { body } = require;

    const dashboard = await Dashboards.create(body);

    return response.status(201).json(dashboard.dataValues);
  } catch (e) {
    return next(e);
  }
};

const remove = async (require, response, next) => {
  try {
    const { id } = require.params;
    await Dashboards.destroy({ where: { id }});
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
