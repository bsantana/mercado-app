'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Produtos', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      nome: { type: Sequelize.STRING, allowNull: false, unique: true },
      // categoria removido, agora é relacional
      marca: { type: Sequelize.STRING, allowNull: false },
      fonte: { type: Sequelize.STRING, allowNull: true },
      imagem: { type: Sequelize.STRING, allowNull: true },
      CategoriaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Categorias', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Produtos');
  }
};