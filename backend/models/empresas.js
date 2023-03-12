'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class empresas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  empresas.init({
    nome: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    razaoSocial: DataTypes.STRING,
    email: DataTypes.STRING,
    responsavel: DataTypes.STRING,
    emailResponsavel: DataTypes.STRING,
    telefoneResponsavel: DataTypes.STRING,
    dashboardLink: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'empresas',
  });
  return empresas;
};