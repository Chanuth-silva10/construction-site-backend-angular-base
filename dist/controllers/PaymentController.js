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
const PaymentService_1 = require("../services/PaymentService");
const autoBind = require('auto-bind');
class PaymentController {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.paymentService = PaymentService_1.PaymentService.getInstance();
        autoBind(this);
    }
    addPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("PaymentController - addPayment()");
            if (req.body) {
                yield this.paymentService.addPayment(req.body)
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
    viewPayments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("PaymentController - viewPayments()");
            yield this.paymentService.viewPayments()
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    getPaymentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("PaymentController - getPaymentById()");
            const id = req.params.id;
            yield this.paymentService.getPaymentById(id)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    editPayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("PaymentController - editPayment()");
            const id = req.params.id;
            const payment = req.body;
            yield this.paymentService.editPayment(id, payment)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    deletePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("PaymentController - deletePayment()");
            const id = req.params.id;
            yield this.paymentService.deletePayment(id)
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
exports.default = PaymentController;
//# sourceMappingURL=PaymentController.js.map