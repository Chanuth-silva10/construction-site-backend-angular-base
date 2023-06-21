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
const express = require('express');
const config_1 = require("./config/config");
const logger_1 = require("./loaders/logger");
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express();
        const logger = logger_1.Logger.getInstance();
        yield require('./loaders').default(app);
        app.listen(config_1.default.port, () => {
            logger.info(`Server is running on port ${config_1.default.port}`);
        }).on("error", (err) => {
            logger.error(err.toString());
        });
    });
}
startServer().then();
//# sourceMappingURL=server.js.map