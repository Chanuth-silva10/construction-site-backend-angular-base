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
const OrderService_1 = require("../services/OrderService");
const autoBind = require('auto-bind');
class OrderController {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.orderService = OrderService_1.OrderService.getInstance();
        autoBind(this);
    }
    addOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("OrderController - addOrder()");
            if (req.body) {
                yield this.orderService.addOrder(req.body)
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
    viewOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("OrderController - viewOrders()");
            yield this.orderService.viewOrders()
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    getOrderById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("OrderController - getOrderById()");
            const id = req.params.id;
            yield this.orderService.getOrderById(id)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    getOrderByStatusAndEmpType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("OrderController - getOrderByStatusAndEmpType()");
            const status = req.params.status;
            const empType = req.params.empType;
            yield this.orderService.getOrderByStatusAndEmpType(status, empType)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    editOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("OrderController - editOrder()");
            const id = req.params.id;
            const order = req.body;
            yield this.orderService.editOrder(id, order)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    addComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("OrderController - addComments()");
            const id = req.params.id;
            const comment = req.body;
            yield this.orderService.addComment(id, comment)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    updateOrderStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("OrderController - updateOrderStatus()");
            const request = req.body;
            yield this.orderService.updateOrderStatus(request)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    deleteOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("OrderController - deleteOrder()");
            const id = req.params.id;
            yield this.orderService.deleteOrder(id)
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
exports.default = OrderController;
//# sourceMappingURL=OrderController.js.map