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
exports.PermissionService = void 0;
const logger_1 = require("../loaders/logger");
const PermissionDao_1 = require("../dao/PermissionDao");
class PermissionService {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.PermissionDao = PermissionDao_1.PermissionDao.getInstance();
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new PermissionService();
        }
        return this.instance;
    }
    createPermission(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Permission Services - createPermission()");
            return yield this.PermissionDao.save(request)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    getAllPermission() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Permission Services - getAllPermission()");
            return yield this.PermissionDao.getAll()
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    getPermissionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Permission Services - getPermissionById()");
            return yield this.PermissionDao.getById(id)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    updatePermission(id, category) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Customer Services - updateCustomer()");
            return yield this.PermissionDao.update(id, category)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    deletePermission(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Permission Services - deletePermission()");
            return yield this.PermissionDao.delete(id)
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
exports.PermissionService = PermissionService;
PermissionService.instance = null;
//# sourceMappingURL=PermissionService.js.map