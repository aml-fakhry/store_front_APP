"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
/**
 * DbService class to initial database configurations.
 */
class DbService {
    constructor() {
        const { PSQL_HOST, PSQL_DB, PSQL_USER, PSQL_PASSWORD, ENV, PSQL_DB_TEST } = process.env;
        /**
         * just check environment.
         */
        if (ENV === 'test') {
            /* Initial clients (pool) to connected to db at test environment.*/
            this.pool = new pg_1.Pool({
                host: PSQL_HOST,
                database: PSQL_DB_TEST,
                user: PSQL_USER,
                password: PSQL_PASSWORD,
                port: 5433,
                max: 20,
            });
        }
        else {
            /* Initial clients (pool) to connected to db at development environment.*/
            this.pool = new pg_1.Pool({
                host: PSQL_HOST,
                database: PSQL_DB,
                user: PSQL_USER,
                password: PSQL_PASSWORD,
                port: 5433,
                max: 20,
            });
        }
    }
    /**
     * query() function to run a single query on the database, so as convenience the pool has a method to run a query on the first available idle client and return its result.
     * @param queryTextOrConfig the text query that run on db.
     * @param params the  value of params that used in query.
     * @returns query result
     */
    query(queryTextOrConfig, params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.pool.query(queryTextOrConfig, params);
        });
    }
}
exports.default = DbService;
