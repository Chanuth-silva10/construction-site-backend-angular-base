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
const express_1 = require("./express");
const mongoose_1 = require("./mongoose");
const logger_1 = require("./logger");
exports.default = (expressApp) => __awaiter(void 0, void 0, void 0, function* () {
    const logger = logger_1.Logger.getInstance();
    yield (0, mongoose_1.default)();
    logger.info('MongoDB Initialized');
    yield (0, express_1.default)({ app: expressApp });
    logger.info('Express Initialized');
});
//# sourceMappingURL=index.js.map