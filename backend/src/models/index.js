import path from 'path';
import { Sequelize } from 'sequelize';
import configFile from '../config/config.cjs';
import produtoModel from './produto.cjs';
import mercadoModel from './mercado.cjs';
import precoModel from './preco.cjs';
import categoriaModel from './categoria.cjs';

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;



db.Categoria = categoriaModel(sequelize, Sequelize.DataTypes);
db.Produto = produtoModel(sequelize, Sequelize.DataTypes);
db.Mercado = mercadoModel(sequelize, Sequelize.DataTypes);
db.Preco = precoModel(sequelize, Sequelize.DataTypes);

// Chama associate se existir
if (db.Categoria.associate) db.Categoria.associate(db);
if (db.Produto.associate) db.Produto.associate(db);
if (db.Mercado.associate) db.Mercado.associate(db);
if (db.Preco.associate) db.Preco.associate(db);

export default db;
