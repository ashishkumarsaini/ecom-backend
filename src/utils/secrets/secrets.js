const dotenv = require('dotenv');

dotenv.config({ path: '.env' });

const env = process.env;

const getEnvVariables = () => {
  return {
    APP_PORT: env.PORT,
    CORS_ORIGIN: env.CORS_ORIGIN,
    MONGO_URI: env.MONGO_URI,
    MAIL_TRAP_HOST: env.MAIL_TRAP_HOST,
    MAIL_TRAP_PORT: env.MAIL_TRAP_PORT,
    MAIL_TRAP_USER_NAME: env.MAIL_TRAP_USER_NAME,
    MAIL_TRAP_USER_PASS: env.MAIL_TRAP_USER_PASS,
    ACCESS_TOKEN_SECRET: env.ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_SECRET_EXPIRY: env.ACCESS_TOKEN_SECRET_EXPIRY,
    REFRESH_TOKEN_SECRET: env.REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET_EXPIRY: env.REFRESH_TOKEN_SECRET_EXPIRY,
    FRONTEND_HOST: env.FRONTEND_HOST,
  };
};

const envVariables = getEnvVariables() || {};

// application
const APP_PORT = envVariables.APP_PORT || 8080;
const CORS_ORIGIN =
  envVariables.CORS_ORIGIN?.split(',') || 'http://localhost:3000';

// mongo
const MONGO_URI = envVariables.MONGO_URI || '';

//auth
const ACCESS_TOKEN_SECRET = envVariables.ACCESS_TOKEN_SECRET || '';
const ACCESS_TOKEN_SECRET_EXPIRY =
  envVariables.ACCESS_TOKEN_SECRET_EXPIRY || '';
const REFRESH_TOKEN_SECRET = envVariables.REFRESH_TOKEN_SECRET || '';
const REFRESH_TOKEN_SECRET_EXPIRY =
  envVariables.REFRESH_TOKEN_SECRET_EXPIRY || '';

// mailtrap
const MAIL_TRAP_HOST = envVariables.MAIL_TRAP_HOST || '';
const MAIL_TRAP_PORT = envVariables.MAIL_TRAP_PORT || '';
const MAIL_TRAP_USER_NAME = envVariables.MAIL_TRAP_USER_NAME || '';
const MAIL_TRAP_USER_PASS = envVariables.MAIL_TRAP_USER_PASS || '';

// fe
const FRONTEND_HOST = envVariables.FRONTEND_HOST || 'http://localhost:3000';

module.exports = {
  APP_PORT,
  CORS_ORIGIN,
  MONGO_URI,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_SECRET_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET_EXPIRY,
  MAIL_TRAP_HOST,
  MAIL_TRAP_PORT,
  MAIL_TRAP_USER_NAME,
  MAIL_TRAP_USER_PASS,
  FRONTEND_HOST,
};
