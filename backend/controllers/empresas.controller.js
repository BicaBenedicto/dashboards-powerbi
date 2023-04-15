const { empresas: Empresas, responsaveis: Responsaveis, permissoes: Permissoes } = require('../models');

const PERMISSIONS_DEFAULT = [
  { nome: 'Operações', level: 1 },
  { nome: 'Líderes', level: 2 },
  { nome: 'Gerente', level: 3 },
  { nome: 'Administrador', level: 4 },
  { nome: 'Diretoria', level: 5 },
];

const get = async (require, response, next) => {
  try {
    const query = require.query;

    const empresas = await Empresas.findAll({
      where: query,
      attributes: [
        'id',
        'nome',
        'cnpj',
        'razaoSocial',
        'status',
        'createdAt',
        'updatedAt',
      ],
    });

    const empresasComResponsaveis = await Promise.all(
      empresas.map(async (empresa) => ({
        ...empresa.dataValues,
        responsaveis: await Responsaveis.findAll({ where: { empresaId: empresa.id }, attributes: ['id', 'nome', 'email', 'telefone']}),
        permissoes: await Permissoes.findAll({ where: { empresaId: empresa.id }, attributes: ['id', 'nome', 'level', 'status']}),
      }))
    );

    return response.status(200).json(empresasComResponsaveis);
  } catch (e) {
    return next(e);
  }
};

const update = async (require, response, next) => {
  try {
    const { id } = require.params;
    const { nome, cnpj, razaoSocial, email, status, responsaveis } = require.body;
    let responsaveisSaida = [];

    await Empresas.update({nome, cnpj, razaoSocial, email, status}, { where: { id }});

    if (responsaveis && responsaveis.length > 0) {
      await Responsaveis.destroy({ where: { 'empresaId': id }});

      responsaveisSaida = await Promise.all(responsaveis.map(async (resp) => await Responsaveis.create({...resp, empresaId: id })));
    };

    return response.status(200).json({ id, ...require.body, responsaveis: responsaveisSaida });
  } catch (e) {
    return next(e);
  }
};

const create = async (require, response, next) => {
  try {
    const { nome, cnpj, razaoSocial, status, responsaveis } = require.body;
    let responsaveisSaida = [];

    const empresa = await Empresas.findOrCreate({
      where: { cnpj, razaoSocial },
      default: {
        nome,
        cnpj,
        razaoSocial,
        status,
      }
    });

    const permissoes = await Promise.all(PERMISSIONS_DEFAULT.map(async (resp) => await Permissoes.create({
      nome: resp.nome,
      empresaId: empresa.dataValues.id,
      level: resp.level,
      status: true,
    }) ));

    if (responsaveis && responsaveis.length > 0) {
      responsaveisSaida = await Promise.all(responsaveis.map(async (resp) => await Responsaveis.create({...resp, empresaId: empresa.dataValues.id }) ));
    };

    return response.status(201).json({...empresa.dataValues, responsaveis: responsaveisSaida, permissoes });
  } catch (e) {
    return next(e);
  }
};

const remove = async (require, response, next) => {
  try {
    const { id } = require.params;
    await Empresas.destroy({ where: { id }});
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
