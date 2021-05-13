import dotenv from 'dotenv';

dotenv.config();
const { NODE_ENV, PORT, APP_NAME } = process.env;

export const environments = {
  ENV: NODE_ENV,
  PORT,
  APP_NAME
}
