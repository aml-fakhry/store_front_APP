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
exports.TestDataAccess = void 0;
const server_1 = require("../../server");
// import { testDto } from './test.dto';
class TestDataAccess {
    /**
     * getData() method to get data.
     * @returns data result.
     */
    static GetData() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = {};
            try {
                const query = 'SELECT * FROM test;';
                result.data = (yield server_1.Database.query(query)).rows;
            }
            catch (error) {
                result.error = error;
            }
            return result;
        });
    }
    /*  Get File suffix. */
    static getFileSuffix(filename, width, height) {
        return `${filename}_${width}_${height}`;
    }
}
exports.TestDataAccess = TestDataAccess;
