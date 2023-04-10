const { empresas: Empresas } = require('../models');
const { Empresas: EmpresasValidation } = require('../validations');
const { remove: removeValidation, create: createValidation, update: updateValidation } = EmpresasValidation;

const get = async (_require, _response, next) => {
  try {
    return next();
  } catch (e) {
    return next(e);
  }
};

const remove = async (require, _response, next) => {
  try {
    const { id } = require.params;

    const validate = await removeValidation.validateAsync({ id });
    if(validate.error) return next(validate.error);

    const empresaExists = await Empresas.findByPk(id);
    if(!empresaExists) return next('notFound');

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

  const empresaExists = await Empresas.findByPk(id);
  if(!empresaExists.dataValues) return next('notFound');

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