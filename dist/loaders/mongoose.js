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
const mongoose = require("mongoose");
const config_1 = require("../config/config");
const logger_1 = require("./logger");
exports.default = () => __awaiter(void 0, void 0, void 0, function* () {
    const logger = logger_1.Logger.getInstance();
    const connection = yield mongoose.connect(config_1.default.dbURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    /**
     * MongoDB Connection
     */
    mongoose.connection.on("connected", () => {
        logger.debug("DB Connection Established");
    });
    mongoose.connection.on("reconnected", () => {
        logger.debug("DB Connection Reestablished");
    });
    mongoose.connection.on("disconnected", () => {
        logger.debug("DB Connection Disconnected");
    });
    mongoose.connection.on("close", () => {
        logger.debug("DB Connection Closed");
    });
    mongoose.connection.on("error", (error) => {
        logger.error("DB Connection ERROR: " + error);
    });
    return connection.connection.db;
});
//# sourceMappingURL=mongoose.js.map