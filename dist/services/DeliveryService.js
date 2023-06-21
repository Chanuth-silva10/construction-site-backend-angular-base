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
exports.DeliveryService = void 0;
const logger_1 = require("../loaders/logger");
const DeliveryDao_1 = require("../dao/DeliveryDao");
class DeliveryService {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.deliveryDao = DeliveryDao_1.DeliveryDao.getInstance();
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new DeliveryService();
        }
        return this.instance;
    }
    addDelivery(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('DeliveryService - addDelivery()');
            return yield this.deliveryDao.save(request)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    viewDeliveries() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('DeliveryService - viewDeliveries()');
            return yield this.deliveryDao.getAll()
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    getDeliveryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('DeliveryService - getDeliveryById()');
            return yield this.deliveryDao.getById(id)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    editDelivery(id, delivery) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('DeliveryService - editDelivery()');
            return yield this.deliveryDao.update(id, delivery)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    deleteDelivery(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('DeliveryService - deleteDelivery()');
            return yield this.deliveryDao.delete(id)
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
exports.DeliveryService = DeliveryService;
DeliveryService.instance = null;
//# sourceMappingURL=DeliveryService.js.map