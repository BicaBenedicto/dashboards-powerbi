'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('empresas', [{
      nome: 'Root',
      razaoSocial: 'Dashboard de Power BI - Root',
      cnpj: '00000000000000',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
    await queryInterface.bulkInsert('permissoes', [{
      nome: 'Root',
      level: 1000,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      empresaId: 1,
    }], {});
    await queryInterface.bulkInsert('usuarios', [{
      nome: 'Ramon TI',
      email: 'contato@ramonti.com.br',
      permissao: 1,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      empresaId: 1,
      senha: '$2y$10$yglxLQ4HVlOz8t89/gJ7vOljMVluGa2zh.jgb6SVjkTwxpvjAdySy', // Senha @123456@ criptograda
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('usuarios', null, {});
    await queryInterface.bulkDelete('permissoes', null, {});
    await queryInterface.bulkDelete('empresas', null, {});
  }
};
