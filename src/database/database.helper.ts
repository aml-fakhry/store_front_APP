import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { PSQL_HOST, PSQL_DB, PSQL_USER, PSQL_PASSWORD } = process.env;

export const client = new Pool({
  host: PSQL_HOST,
  database: PSQL_DB,
  user: PSQL_USER,
  password: PSQL_PASSWORD,
});
