module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define('Produto', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    // categoria removido, agora é relacional
    marca: { type: DataTypes.STRING, allowNull: false },
    fonte: { type: DataTypes.STRING, allowNull: true },
    imagem: { type: DataTypes.STRING, allowNull: true },
    CategoriaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'Categorias', key: 'id' }
    }
  });

  Produto.associate = (models) => {
    Produto.hasMany(models.Preco, { foreignKey: 'ProdutoId', as: 'precos' });
    Produto.belongsTo(models.Categoria, { foreignKey: 'CategoriaId', as: 'categoria' });
  };

  return Produto;
};