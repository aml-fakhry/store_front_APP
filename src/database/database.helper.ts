import { Pool, QueryResult } from 'pg';

/**
 * DbService class to initial database configurations.
 */

export default class DbService {
  /* The client that connect to db. */
  pool;
  constructor() {
    const { PSQL_HOST, PSQL_DB, PSQL_USER, PSQL_PASSWORD } = process.env;

    /* Initial clients (pool) to connected to db.*/
    this.pool = new Pool({
      host: PSQL_HOST,
      database: PSQL_DB,
      user: PSQL_USER,
      password: PSQL_PASSWORD,
      port: 5433,
      max: 20,
    });
  }

  /**
   * query() function to run a single query on the database, so as convenience the pool has a method to run a query on the first available idle client and return its result.
   * @param queryTextOrConfig the text query that run on db.
   * @param params the  value of params that used in query.
   * @returns query result
   */
  async query(queryTextOrConfig: string, params?: unknown[]): Promise<QueryResult> {
    return this.pool.query(queryTextOrConfig, params);
  }
}
