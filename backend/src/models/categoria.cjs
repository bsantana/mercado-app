module.exports = (sequelize, DataTypes) => {
  const Categoria = sequelize.define('Categoria', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.STRING, allowNull: true },
    MercadoId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Mercados', key: 'id' }
    }
  }, {
    tableName: 'Categorias'
  });
  Categoria.associate = (models) => {
    Categoria.belongsTo(models.Mercado, { foreignKey: 'MercadoId' });
    Categoria.hasMany(models.Produto, { foreignKey: 'CategoriaId', as: 'produtos' });
  };
  return Categoria;
};