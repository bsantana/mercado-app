module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Produtos', [
      { nome: 'Arroz 5kg', categoria: 'Alimentos', marca: 'Tio João', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Feijão 1kg', categoria: 'Alimentos', marca: 'Kicaldo', createdAt: new Date(), updatedAt: new Date() },
      { nome: 'Óleo de Soja', categoria: 'Alimentos', marca: 'Liza', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Produtos', null, {});
  }
};
