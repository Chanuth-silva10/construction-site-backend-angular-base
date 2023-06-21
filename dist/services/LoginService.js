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
exports.LoginService = void 0;
const logger_1 = require("../loaders/logger");
const LoginDao_1 = require("../dao/LoginDao");
class LoginService {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.loginDao = LoginDao_1.LoginDao.getInstance();
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new LoginService();
        }
        return this.instance;
    }
    createLogin(newLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('LoginService - createLogin()');
            return yield this.loginDao.save(newLogin)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    getLogin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('LoginService - getLogin()');
            return yield this.loginDao.getByEmail(email)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    updateLogin(email, newLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('LoginService - updateLogin()');
            return yield this.loginDao.update(email, newLogin)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    deleteLogin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('LoginService - deleteLogin()');
            return yield this.loginDao.delete(email)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
}
exports.LoginService = LoginService;
LoginService.instance = null;
//# sourceMappingURL=LoginService.js.map