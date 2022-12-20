import { config } from 'dotenv';
import { DbClient } from 'src/common/types/types';

import { AppEnvironment } from './app-environment.enum';

config();

const {
  NODE_ENV,
  PORT,
  DATABASE_TYPE,
  DATABASE_PORT,
  DATABASE_HOST,
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_NAME,
  PRIVATE_KEY,
  TOKEN_EXPIRY_PERIOD,
} = process.env;

const ENV = {
  APP: {
    NODE_ENV: <AppEnvironment>NODE_ENV,
    SERVER_PORT: Number(PORT),
  },
  DB: {
    TYPE: DATABASE_TYPE as DbClient,
    PORT: Number(DATABASE_PORT),
    HOST: DATABASE_HOST,
    USERNAME: DATABASE_USERNAME,
    PASSWORD: DATABASE_PASSWORD,
    NAME: DATABASE_NAME,
  },
  JWT: {
    JWT_PRIVATE_KEY: PRIVATE_KEY,
    JWT_TOKEN_EXPIRY_PERIOD: TOKEN_EXPIRY_PERIOD,
  },
};

export { ENV };
