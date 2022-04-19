"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalServerError = exports.NotFound = exports.OK = void 0;
const model_1 = require("../model");
/**
 * Returns a succeeded response with 200 status code.
 * @param res The http-response to be modified.
 * @param body An optional body that will be sent within the response' body.
 */
function OK(res, body) {
    return body ? res.status(200).send(body) : res.send();
}
exports.OK = OK;
/**
 * Returns a not found response with 404 status code.
 * @param res The http-response to be modified.
 * @param body An optional body that will be sent within the response' body.
 */
function NotFound(res, body) {
    return body ? res.status(404).send(body) : res.status(404).send();
}
exports.NotFound = NotFound;
/**
 * Returns an internal server error response with 500 status code.
 * @param res The http-response to be modified.
 * @param err The error or error-message to be sent within the response' body.
 */
function InternalServerError(res, err) {
    const body = {
        errors: [
            {
                code: model_1.AppErrorCode.InternalServerError,
                title: model_1.AppError.InternalServerError,
                detail: typeof err === 'string' ? err : err.message,
            },
        ],
    };
    return res.status(500).send(body);
}
exports.InternalServerError = InternalServerError;
