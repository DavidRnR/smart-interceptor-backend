import dotenv from 'dotenv';
dotenv.config({
  path: ['.env.local', '.env'],
});

export const JWT_CONFIG = {
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET || 'testNodeJS',
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET || 'refreshNodeJS',
  JWT_ACCESS_TOKEN_LIFE: Number(process.env.JWT_ACCESS_TOKEN_LIFE) || 900,
  JWT_REFRESH_TOKEN_LIFE: Number(process.env.JWT_REFRESH_TOKEN_LIFE) || 86400,
};

export const SERVER_CONFIG = {
  PORT: Number(process.env.PORT) || 5000,
};

export const DB_CONFIG = {
  NAME: process.env.DB_NAME || 'dbname',
  HOST: process.env.DB_HOST || 'localhost',
  USERNAME: process.env.DB_USERNAME || 'test',
  PASSWORD: process.env.DB_PASSWORD || 'testpassword',
  PORT: Number(process.env.DB_PORT) || 3306,
};
