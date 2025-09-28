module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Mercados', [
      { nome: 'Supermercado Central', endereco: 'Rua A, 123', cidade: 'Cidade X', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Mercado Bom Preço', endereco: 'Av. B, 456', cidade: 'Cidade X', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Mercados', null, {});
  }
};
