'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('dashboards_permissoes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      permissaoId: {
        references: {
          model: 'permissoes',
          key: 'id'
        },
        onUpdate: "cascade",
        onDelete: "cascade",
        type: Sequelize.INTEGER
      },
      dashboardId: {
        references: {
          model: 'dashboards',
          key: 'id'
        },
        onUpdate: "cascade",
        onDelete: "cascade",
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('dashboards_permissoes');
  }
};