const { empresas: Empresas } = require('../models');
const { Empresas: EmpresasValidation } = require('../validations');
const { remove: removeValidation, create: createValidation, update: updateValidation } = EmpresasValidation;

const get = async (_require, _response, next) => next();

const remove = async (require, _response, next) => {
  const { id } = require.params;

  const validate = await removeValidation.validate({ id });
  if(validate.error) return next(validate.error);

  const empresaExists = await Empresas.findByPk(id);
  if(!empresaExists) return next('notFound');

  return next();
};

const create = async (require, _response, next) => {
  const { body } = require;

  const validate = await createValidation.validate(body);
  if(validate.error) return next(validate.error);

  return next();
};

const update = async (require, _response, next) => {
  const { body } = require;
  const { id } = require.params;

  const validate = await updateValidation.validate({...body, id});
  if(validate.error) return next(validate.error);

  const empresaExists = await Empresas.findByPk(id);
  if(!empresaExists.dataValues) return next('notFound');

  return next();
};

module.exports = {
  get,
  remove,
  create,
  update
};