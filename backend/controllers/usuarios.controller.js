const { usuarios: Usuarios, permissoes: Permissoes } = require('../models');
const bcrypt = require('bcryptjs');

const login = async (require, response, next) => {
  try {
    const { email, senha } = require.body;

    const userFounded = await Usuarios.findOne({ where: { email } });

    if(!userFounded) throw 'notFound';

    const passwordCrypt = await bcrypt.compare(senha, userFounded.senha);

    if (!passwordCrypt) throw 'wrongLogin';

    const user = await Usuarios.findOne({
      where: { email },
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

    const permissaoInfo = await Permissoes.findByPk(user.dataValues.permissao);

    return response.status(200).json({...user.dataValues, permissao: permissaoInfo.level, permissaoInfo });
  } catch (error) {
    return next(error);
  }
};


const get = async (require, response, next) => {
  try {
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

    const usuariosComPermissao = await Promise.all(
      usuarios.map(async (user) => ({...user.dataValues, permissao: await Permissoes.findByPk(user.dataValues.permissao)})),
    );

    return response.status(200).json(usuariosComPermissao);
  } catch (e) {
    return next(e);
  }
};

const update = async (require, response, next) => {
  try {
    const { id } = require.params;
    const { body } = require;

    if (body.senha) {
      body.senha = await bcrypt.hash(body.senha, 10);
    }

    await Usuarios.update(body, { where: { id }});

    return response.status(200).json({ id, ...body });
  } catch (e) {
    return next(e);
  }
};

const create = async (require, response, next) => {
  try {
    const { email, nome, senha, empresaId, permissao, status } = require.body;

    const password = await bcrypt.hash(senha, 10);

    const usuario = await Usuarios.create({ email, nome, senha: password, empresaId, permissao, status });

    const permissaoGet = await Permissoes.findByPk(usuario.dataValues.permissao);

    return response.status(201).json({...usuario.dataValues, permissao: ({...permissaoGet.dataValues})});
  } catch (e) {
    return next(e);
  }
};

const remove = async (require, response, next) => {
  try {
    const { id } = require.params;
    await Usuarios.destroy({ where: { id }});
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
  login,
};
