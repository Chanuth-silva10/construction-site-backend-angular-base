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
exports.PaymentService = void 0;
const logger_1 = require("../loaders/logger");
const PaymentDao_1 = require("../dao/PaymentDao");
class PaymentService {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.paymentDao = PaymentDao_1.PaymentDao.getInstance();
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new PaymentService();
        }
        return this.instance;
    }
    addPayment(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('PaymentService - addPayment()');
            return yield this.paymentDao.save(request)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    viewPayments() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('PaymentService - viewPayments()');
            return yield this.paymentDao.getAll()
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    getPaymentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('PaymentService - getPaymentById()');
            return yield this.paymentDao.getById(id)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    editPayment(id, payment) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('PaymentService - editPayment()');
            return yield this.paymentDao.update(id, payment)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    deletePayment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('PaymentService - deletePayment()');
            return yield this.paymentDao.delete(id)
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
exports.PaymentService = PaymentService;
PaymentService.instance = null;
//# sourceMappingURL=PaymentService.js.map