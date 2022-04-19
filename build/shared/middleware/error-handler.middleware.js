"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_response_util_1 = require("../utils/http-response.util");
const logger_util_1 = require("./../utils/logger.util");
/**
 * A middleware that handles the errors that may occurs in express routes callbacks.
 * @param err The error object.
 * @param req The express request instance.
 * @param res The express response instance.
 * @param next The next middleware but actually this should be the last middleware in the pipeline, don't remove this parameter it's important.
 */
function errorHandler(err, req, res, next) {
    logger_util_1.Logger.error(err.message, err);
    (0, http_response_util_1.InternalServerError)(res, err);
}
exports.errorHandler = errorHandler;
