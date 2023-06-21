"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const winston = require("winston");
class Logger {
    static getInstance() {
        if (Logger.instance === null) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    constructor() {
        this.transports = {
            logs: new winston.transports.File({
                filename: "./logs/logs.log",
                format: winston.format.combine(winston.format.timestamp({
                    format: 'DD-MM-YYYY HH:mm:ss'
                }), winston.format.errors({ stack: true }), winston.format.splat(), winston.format.simple(), winston.format.json()),
            }),
            console: new winston.transports.Console({
                format: winston.format.combine(winston.format.errors({ stack: true }), winston.format.splat(), winston.format.simple()),
            }),
        };
        this.logger = winston.createLogger({
            levels: winston.config.npm.levels,
            transports: [
                this.transports.logs,
                this.transports.console
            ]
        });
    }
    info(msg) {
        this.logger.info(msg);
    }
    error(msg) {
        this.logger.error(msg);
    }
    warn(msg) {
        this.logger.warn(msg);
    }
    debug(msg) {
        this.logger.debug(msg);
    }
    silly(msg) {
        this.logger.silly(msg);
    }
}
exports.Logger = Logger;
Logger.instance = null;
//# sourceMappingURL=logger.js.map