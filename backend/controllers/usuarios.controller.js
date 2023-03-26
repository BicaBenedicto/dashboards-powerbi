const bcrypt = require('bcryptjs');
const { usuarios: Usuarios, permissoes: Permissoes, empresas: Empresas } = require('../models');
const emailSend = require('../services/email.service');
const randomPassword = require('../utils/randomPassword.util');

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
        'empresaId',
        'status',
        'createdAt',
        'updatedAt',
      ],
    });

    const [permissaoInfo, empresa] = await Promise.all([
      Permissoes.findByPk(user.dataValues.permissao),
      Empresas.findByPk(user.dataValues.empresaId),
    ]);

    return response.status(200).json({...user.dataValues, permissao: permissaoInfo.level, permissaoInfo, empresa });
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
        'empresaId',
        'status',
        'createdAt',
        'updatedAt',
      ],
    });

    const usuariosComPermissao = await Promise.all(
      usuarios.map(async (user) => ({...user.dataValues, permissao: await Permissoes.findByPk(user.dataValues.permissao), empresa: await Empresas.findByPk(user.dataValues.empresaId)})),
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

    return response.status(201).json({...usuario.dataValues, senha: '******', permissao: ({...permissaoGet.dataValues})});
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

const forgetPassword = async (require, response, next) => {
  try {
    const { email } = require.body;

    const password = await randomPassword(10);

    const tempPassword = await bcrypt.hash(password, 10);

    await emailSend.send(
      email,
      '[Dashboard de Power BI]! Aqui está o seu novo acesso 🔑',
      null,
      `Olá, <br /><br />
      Aqui está o seu acesso: <br /><br />
      <b>Usuário</b>: ${email}<br />
      <b>Senha</b>: ${tempPassword} <br /><br />
      `
    );

    return response.status(200).json({ message: 'Enviado nova senha' });
  } catch (e) {
    return next(e);
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  login,
  forgetPassword,
};
