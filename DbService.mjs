import pg from 'pg';
const { Pool } = pg;

export default class DbService {
  pool;
  constructor() {
    const { PSQL_HOST, PSQL_DB, PSQL_USER, PSQL_PASSWORD } = process.env;

    this.pool = new Pool({
      host: PSQL_HOST,
      database: PSQL_DB,
      user: PSQL_USER,
      password: PSQL_PASSWORD,
      port: 5433,
    });
  }

  doQuery = async (statement, params) => {
    return this.pool.query(statement, params);
  };
}
