'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Precos', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      valor: { type: Sequelize.FLOAT, allowNull: false },
      data: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      ProdutoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Produtos', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      MercadoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Mercados', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') }
    });
    // Adiciona constraint UNIQUE para ProdutoId, MercadoId e valor
    await queryInterface.addConstraint('Precos', {
      fields: ['ProdutoId', 'MercadoId', 'valor'],
      type: 'unique',
      name: 'unique_preco_produto_mercado_valor'
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Precos');
  }
};