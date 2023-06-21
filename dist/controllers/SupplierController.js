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
const logger_1 = require("../loaders/logger");
const SupplierService_1 = require("../services/SupplierService");
const autoBind = require('auto-bind');
class SupplierController {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.supplierService = SupplierService_1.SupplierService.getInstance();
        autoBind(this);
    }
    createSupplier(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("SupplierController - createSupplier()");
            if (req.body) {
                yield this.supplierService.createSupplier(req.body)
                    .then(data => {
                    res.status(200).send(data);
                })
                    .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({ err: error.message });
                });
            }
        });
    }
    getAllSupplier(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("SupplierController - getAllSupplier()");
            yield this.supplierService.getAllSupplier()
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    getSupplierById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("SupplierController - getSupplierById()");
            const id = req.params.id;
            yield this.supplierService.getSupplierById(id)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    updateSupplier(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("SupplierController - updateSupplier()");
            const id = req.params.id;
            const supplier = req.body;
            yield this.supplierService.updateSupplier(id, supplier)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    deleteSupplier(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("SupplierController - deleteSupplier()");
            const id = req.params.id;
            yield this.supplierService.deleteSupplier(id)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
}
exports.default = SupplierController;
//# sourceMappingURL=SupplierController.js.map