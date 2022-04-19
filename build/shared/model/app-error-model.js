"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
/**
 * The application-specific errors.
 */
var AppError;
(function (AppError) {
    AppError["InternalServerError"] = "Internal server error";
    AppError["IsRequired"] = "The field is required";
    AppError["ValueExists"] = "The entity field value already exists in another entity";
    AppError["IncorrectValue"] = "The value is not correct or doesn't meets the expected value criteria";
})(AppError = exports.AppError || (exports.AppError = {}));
