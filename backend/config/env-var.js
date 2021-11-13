import dotenv from 'dotenv';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 8000;
export const DB = {
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGNAME || process.env.DB_NAME || 'test',
  user: process.env.PGUSER,
  password: process.env.PGPASS,
};
export const { DEBUG_SQL, JWT_SECRET, JWT_EXPIRATION } = process.env;
