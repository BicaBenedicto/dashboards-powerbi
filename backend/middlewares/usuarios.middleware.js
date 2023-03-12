const { usuarios: Usuarios } = require('../models');
const { Usuarios: UsuariosValidation } = require('../validations');
const { remove: removeValidation, create: createValidation, update: updateValidation } = UsuariosValidation;

const get = async (_require, _response, next) => next();

const remove = async (require, _response, next) => {
  const { id } = require.params;

  const validate = await removeValidation.validate({ id });
  if(validate.error) return next(validate.error);

  const usuarioExists = await Usuarios.findByPk(id);
  if(!usuarioExists) return next('notFound');

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

  const usuarioExists = await Usuarios.findByPk(id);
  if(!usuarioExists.dataValues) return next('notFound');

  return next();
};

module.exports = {
  get,
  remove,
  create,
  update
};