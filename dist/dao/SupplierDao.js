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
exports.SupplierDao = void 0;
const logger_1 = require("../loaders/logger");
const Supplier_1 = require("../models/Supplier");
class SupplierDao {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new SupplierDao();
        }
        return this.instance;
    }
    save(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("SupplierDao - save()");
            const category = new Supplier_1.default(request);
            return yield category.save()
                .then(data => {
                this.logger.info(`Supplier ${data.name} Inserted Successfully`);
                return data;
            })
                .catch(error => {
                this.logger.error("Error in inserting product" + error.message);
                throw error;
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("SupplierDao - getAll()");
            return yield Supplier_1.default.find({})
                .then(data => {
                if (data.length > 0) {
                    this.logger.info(`Supplier Retrieved Successfully`);
                }
                else {
                    this.logger.info(`Supplier Not Found`);
                }
                return data;
            })
                .catch(error => {
                this.logger.error("Error in retrieving categories" + error.message);
                throw error;
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("SupplierDao - getById()");
            return yield Supplier_1.default.findById(id)
                .then(data => {
                if (data) {
                    this.logger.info(`${data.name} Supplier Retrieved Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Supplier ${id} Not Found`);
                    return { msg: "Supplier Not Found" };
                }
            })
                .catch(error => {
                this.logger.error(`Error in retrieving category ${id} ${error.message}`);
                throw error;
            });
        });
    }
    update(id, category) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("SupplierDao - update()");
            return yield Supplier_1.default.findByIdAndUpdate(id, { $set: category }, { new: true })
                .then(data => {
                if (data) {
                    this.logger.info(`${data.name} Supplier Updated Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Supplier ${id} Not Found`);
                    return { msg: "Supplier Not Found" };
                }
            })
                .catch(error => {
                this.logger.error(`Error in updating Supplier ${id} ${error.message}`);
                throw error;
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("SupplierDao - delete()");
            return yield Supplier_1.default.findByIdAndDelete(id)
                .then(data => {
                if (data) {
                    this.logger.info(`${data.name} Supplier Deleted Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Supplier ${id} Not Found`);
                    return { msg: "Supplier Not Found" };
                }
            })
                .catch(error => {
                this.logger.error(`Error in deleting Supplier ${id} ${error.message}`);
                throw error;
            });
        });
    }
}
exports.SupplierDao = SupplierDao;
SupplierDao.instance = null;
//# sourceMappingURL=SupplierDao.js.map