'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('empresas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      cnpj: {
        type: Sequelize.STRING
      },
      razaoSocial: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      responsavel: {
        type: Sequelize.STRING
      },
      emailResponsavel: {
        type: Sequelize.STRING
      },
      telefoneResponsavel: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      dashboardLink: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('empresas');
  }
};