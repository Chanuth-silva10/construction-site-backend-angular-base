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
exports.LoginDao = void 0;
const logger_1 = require("../loaders/logger");
const Login_1 = require("../models/Login");
class LoginDao {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new LoginDao();
        }
        return this.instance;
    }
    save(newLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('LoginDao - save()');
            const login = new Login_1.default(newLogin);
            return yield login.save()
                .then(data => {
                this.logger.info(`Login for ${data.email} Inserted Successfully`);
                return data;
            })
                .catch(error => {
                this.logger.error('Error in inserting login' + error.message);
                throw error;
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('LoginDao - getById()');
            return yield Login_1.default.findById(id)
                .then(data => {
                if (data) {
                    this.logger.info(`${data.email} Login Retrieved Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Login ${id} Not Found`);
                    return { msg: 'Login Not Found' };
                }
            })
                .catch(error => {
                this.logger.error(`Error in retrieving login ${id} ${error.message}`);
                throw error;
            });
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('LoginDao - getByEmail()');
            return yield Login_1.default.findOne({ email: email })
                .then(data => {
                if (data) {
                    this.logger.info(`${data.email} Login Retrieved Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Login ${email} Not Found`);
                    return { msg: 'Login Not Found' };
                }
            })
                .catch(error => {
                this.logger.error(`Error in retrieving login ${email} ${error.message}`);
                throw error;
            });
        });
    }
    update(id, newLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('LoginDao - update()');
            return yield Login_1.default.findByIdAndUpdate(id, { $set: newLogin }, { new: true })
                .then(data => {
                if (data) {
                    this.logger.info(`${data.email} Login Updated Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Login ${id} Not Found`);
                }
            })
                .catch(error => {
                this.logger.error(`Error in updating login ${id} ${error.message}`);
                throw error;
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('LoginDao - delete()');
            return yield Login_1.default.findByIdAndDelete(id)
                .then(data => {
                if (data) {
                    this.logger.info(`${data.email} Login Deleted Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Login ${id} Not Found`);
                    return { msg: 'Login Not Found' };
                }
            })
                .catch(error => {
                this.logger.error(`Error in deleting login ${id} ${error.message}`);
                throw error;
            });
        });
    }
}
exports.LoginDao = LoginDao;
LoginDao.instance = null;
//# sourceMappingURL=LoginDao.js.map