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

// application
export const APP_PORT = getEnvVariables().APP_PORT || 8080;
export const CORS_ORIGIN =
  getEnvVariables().CORS_ORIGIN?.split(',') || 'http://localhost:3000';

// mongo
export const MONGO_URI = getEnvVariables().MONGO_URI || '';

//auth
export const ACCESS_TOKEN_SECRET = getEnvVariables().ACCESS_TOKEN_SECRET || '';
export const ACCESS_TOKEN_SECRET_EXPIRY =
  getEnvVariables().ACCESS_TOKEN_SECRET_EXPIRY || '';
export const REFRESH_TOKEN_SECRET =
  getEnvVariables().REFRESH_TOKEN_SECRET || '';
export const REFRESH_TOKEN_SECRET_EXPIRY =
  getEnvVariables().REFRESH_TOKEN_SECRET_EXPIRY || '';

// mailtrap
export const MAIL_TRAP_HOST = getEnvVariables().MAIL_TRAP_HOST || '';
export const MAIL_TRAP_PORT = getEnvVariables().MAIL_TRAP_PORT || '';
export const MAIL_TRAP_USER_NAME = getEnvVariables().MAIL_TRAP_USER_NAME || '';
export const MAIL_TRAP_USER_PASS = getEnvVariables().MAIL_TRAP_USER_PASS || '';

// fe
export const FRONTEND_HOST =
  getEnvVariables().FRONTEND_HOST || 'http://localhost:3000';
