'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dashboardsPermissoes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  dashboardsPermissoes.init({
    permissaoId: DataTypes.INTEGER,
    dashboardId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'dashboards_permissoes',
  });
  return dashboardsPermissoes;
};