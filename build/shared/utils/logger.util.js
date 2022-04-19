"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston_1 = __importDefault(require("winston"));
/* Logger service Wrapper. */
const logger = winston_1.default.createLogger({
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.Console({
            level: 'warn',
        }),
        new winston_1.default.transports.File({
            filename: 'logs/errors.log',
            level: 'error',
            options: {
                createDirectory: true,
                flags: 'a',
            },
        }),
        new winston_1.default.transports.File({
            filename: 'logs/logs.log',
            level: 'info',
            options: {
                createDirectory: true,
                flags: 'a',
            },
        }),
    ],
});
const consoleLogger = winston_1.default.createLogger({
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports: [
        new winston_1.default.transports.Console({
            level: 'silly' /* error, warn, info, verbose, debug & silly logs will be logged to console. */,
        }),
    ],
});
/**
 * Logger service that log any any error, info or warnings.
 */
class Logger {
    /**
     * error() method to log error stack to the logs 'logs/errors.log' file.
     * @param msg the error massage.
     * @param err The Error object to log its stack if it was an exception.
     */
    static error(msg, err) {
        const meta = { stack: err ? err.stack : '' };
        logger.error(msg, meta);
    }
    /**
     * info() method to log info logs to the logs 'logs/logs.log' file.
     * @param msg the error massage.
     * @param meta An optional additional info data.
     * @param logToConsole Makes sure if it safe to log this info to the console.
     */
    static info(msg, meta, logToConsole) {
        logger.info(msg, meta);
        if (logToConsole) {
            consoleLogger.info(msg, meta);
        }
    }
}
exports.Logger = Logger;
