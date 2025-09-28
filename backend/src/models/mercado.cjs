module.exports = (sequelize, DataTypes) => {
  const Mercado = sequelize.define('Mercado', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    endereco: { type: DataTypes.STRING, allowNull: false },
    cidade: { type: DataTypes.STRING, allowNull: false }
  });
  return Mercado;
};