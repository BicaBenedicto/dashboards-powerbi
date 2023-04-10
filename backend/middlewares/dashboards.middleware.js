const { dashboards: Dashboards } = require('../models');
const { Dashboards: DashboardsValidation } = require('../validations');
const { remove: removeValidation, create: createValidation, update: updateValidation } = DashboardsValidation;

const get = async (_require, _response, next) => next();

const remove = async (require, _response, next) => {
  try {
    const { id } = require.params;

    const validate = await removeValidation.validateAsync({ id });
    if(validate.error) return next(validate.error);

    const dashboardExists = await Dashboards.findByPk(id);
    if(!dashboardExists) return next('notFound');

    return next();
  } catch (e) {
    return next(e);
  }
};

const create = async (require, _response, next) => {
  try {
    const { body } = require;

    const validate = await createValidation.validateAsync(body);
    if(validate.error) return next(validate.error);

    return next();
  } catch (e) {
    return next(e);
  }
};

const update = async (require, _response, next) => {
  try {
    const { body } = require;
    const { id } = require.params;

    const validate = await updateValidation.validateAsync({...body, id});
    if(validate.error) return next(validate.error);

    const dashboardExists = await Dashboards.findByPk(id);
    if(!dashboardExists.dataValues) return next('notFound');

    return next();
  } catch (e) {
    return next(e);
  }
};

module.exports = {
  get,
  remove,
  create,
  update
};