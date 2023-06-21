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
exports.SupplierService = void 0;
const logger_1 = require("../loaders/logger");
const SupplierDao_1 = require("../dao/SupplierDao");
class SupplierService {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.SupplierDao = SupplierDao_1.SupplierDao.getInstance();
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new SupplierService();
        }
        return this.instance;
    }
    createSupplier(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Supplier Services - createSupplier()");
            return yield this.SupplierDao.save(request)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    getAllSupplier() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Supplier Services - getAllSupplier()");
            return yield this.SupplierDao.getAll()
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    getSupplierById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Supplier Services - getSupplierById()");
            return yield this.SupplierDao.getById(id)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    updateSupplier(id, supplier) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Supplier Services - updateSupplier()");
            return yield this.SupplierDao.update(id, supplier)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    deleteSupplier(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Supplier Services - deleteSupplier()");
            return yield this.SupplierDao.delete(id)
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
exports.SupplierService = SupplierService;
SupplierService.instance = null;
//# sourceMappingURL=SupplierService.js.map