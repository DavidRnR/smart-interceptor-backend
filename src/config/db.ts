import { Sequelize } from 'sequelize';
import { DB_CONFIG } from './config';

const sequelize = new Sequelize(DB_CONFIG.NAME, DB_CONFIG.USERNAME, DB_CONFIG.PASSWORD, {
  host: DB_CONFIG.HOST,
  dialect: 'mysql',
  port: DB_CONFIG.PORT,
});

export default sequelize;
