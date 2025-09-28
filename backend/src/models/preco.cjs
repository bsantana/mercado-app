module.exports = (sequelize, DataTypes) => {
  const Preco = sequelize.define('Preco', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    valor: { type: DataTypes.FLOAT, allowNull: false },
    data: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
  });
  Preco.associate = (models) => {
    Preco.belongsTo(models.Mercado, { foreignKey: 'MercadoId', as: 'Mercado' });
    Preco.belongsTo(models.Produto, { foreignKey: 'ProdutoId' });
  };
  return Preco;
};