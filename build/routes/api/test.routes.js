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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRelativeRouter = exports.testRouter = void 0;
const express_1 = __importDefault(require("express"));
const data_1 = require("../../data");
const http_response_util_1 = require("../../shared/utils/http-response.util");
/* test router to hold all modules route. */
exports.testRouter = express_1.default.Router();
/**
 * the relative route for image.
 * No need to start with slash '/'.
 */
exports.imageRelativeRouter = 'test';
exports.testRouter.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield data_1.TestDataAccess.GetData();
        if (result.error) {
            next(result.error);
        }
        else if (result.isNotFound) {
            (0, http_response_util_1.NotFound)(res);
        }
        else if (result.validationErrors && result.validationErrors.length) {
            res.status(400).send(result.validationErrors[0].detail);
        }
        else if (result.data) {
            (0, http_response_util_1.OK)(res, { data: result.data });
        }
    }
    catch (error) {
        next(error);
    }
}));
