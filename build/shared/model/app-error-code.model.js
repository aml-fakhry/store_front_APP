"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppErrorCode = void 0;
/*
 * The application-specific error codes.
 */
var AppErrorCode;
(function (AppErrorCode) {
    AppErrorCode[AppErrorCode["IsRequired"] = 1] = "IsRequired";
    AppErrorCode[AppErrorCode["ValueExists"] = 2] = "ValueExists";
    AppErrorCode[AppErrorCode["IncorrectValue"] = 3] = "IncorrectValue";
    AppErrorCode[AppErrorCode["InternalServerError"] = 4] = "InternalServerError";
})(AppErrorCode = exports.AppErrorCode || (exports.AppErrorCode = {}));
