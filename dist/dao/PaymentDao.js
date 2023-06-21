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
exports.PaymentDao = void 0;
const logger_1 = require("../loaders/logger");
const Payment_1 = require("../models/Payment");
class PaymentDao {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new PaymentDao();
        }
        return this.instance;
    }
    save(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('PaymentDao - save()');
            const payment = new Payment_1.default(request);
            // Increment payment ID
            let latestPayment = yield Payment_1.default.find().sort({ payDate: -1 }).limit(1);
            if (latestPayment.length > 0) {
                payment.paymentId = latestPayment[0].paymentId + 1;
            }
            else {
                payment.paymentId = 1000;
            }
            return yield payment.save()
                .then(data => {
                this.logger.info(`Payment ${data._id} Inserted Successfully`);
                return data;
            })
                .catch(error => {
                this.logger.error('Error in inserting payment' + error.message);
                throw error;
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('PaymentDao - getAll()');
            return yield Payment_1.default.find({}).populate('orderId')
                .then(data => {
                if (data.length > 0) {
                    this.logger.info('Payments Retrieved Successfully');
                }
                else {
                    this.logger.error('Payments Not Found');
                }
                return data;
            })
                .catch(error => {
                this.logger.error('Error in retrieving payments' + error.message);
                throw error;
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('PaymentDao - getById()');
            return yield Payment_1.default.findById(id)
                .then(data => {
                if (data) {
                    this.logger.info(`${id} Payment Retrieved Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Payment ${id} Not Found`);
                    return { msg: 'Payment Not Found' };
                }
            })
                .catch(error => {
                this.logger.error(`Error in retrieving payment ${id} ${error.message}`);
                throw error;
            });
        });
    }
    update(id, payment) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('PaymentDao - update()');
            return yield Payment_1.default.findByIdAndUpdate(id, { $set: payment }, { new: true })
                .then(data => {
                if (data) {
                    this.logger.info(`${id} Payment Updated Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Payment ${id} Not Found`);
                    return { msg: 'Payment Not Found' };
                }
            })
                .catch(error => {
                this.logger.error(`Error in updating payment ${id} ${error.message}`);
                throw error;
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('PaymentDao - delete()');
            return yield Payment_1.default.findByIdAndDelete(id)
                .then(data => {
                if (data) {
                    this.logger.info(`${id} Payment Deleted Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Payment ${id} Not Found`);
                    return { msg: 'Payment Not Found' };
                }
            })
                .catch(error => {
                this.logger.error(`Error in deleting payment ${id} ${error.message}`);
                throw error;
            });
        });
    }
}
exports.PaymentDao = PaymentDao;
PaymentDao.instance = null;
//# sourceMappingURL=PaymentDao.js.map