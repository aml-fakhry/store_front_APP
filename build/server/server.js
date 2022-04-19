"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.setupServer = exports.Database = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const database_helper_1 = __importDefault(require("../database/database.helper"));
const routes_1 = require("../routes");
const shared_1 = require("../shared");
const error_handler_middleware_1 = require("./../shared/middleware/error-handler.middleware");
dotenv_1.default.config();
exports.Database = new database_helper_1.default();
/**
 * Set request options for an express server.
 * @param app the express application.
 */
function setRequestOptions(app) {
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
}
/**
 * Register routes for an express server.
 * @param app the express application.
 */
function registerRouter(app) {
    /* That is the base route for api. */
    const apiBaseRoute = '/api/';
    /* Start to register routes */
    app.use(apiBaseRoute + routes_1.imageRelativeRouter, routes_1.testRouter);
}
/**
 * Setup an express server.
 * @param app the express application.
 */
function setupServer(app) {
    /**
     * the order matters.
     * 1- Set request options.
     * 2- Register routes.
     * 3- Add error-handler middleware.
     */
    setRequestOptions(app);
    registerRouter(app);
    app.use(error_handler_middleware_1.errorHandler);
}
exports.setupServer = setupServer;
/**
 * Start an express server.
 * @param app the express application.
 */
function startServer(app) {
    app.listen(process.env.APP_PORT, () => {
        shared_1.Logger.info(`Server is running now at http://localhost:${process.env.APP_PORT}`, null, true);
    });
}
exports.startServer = startServer;
