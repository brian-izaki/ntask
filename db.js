import { Sequelize } from 'sequelize';

const config = require('./libs/config');

const sequelize = new Sequelize(config);

module.exports = sequelize;


