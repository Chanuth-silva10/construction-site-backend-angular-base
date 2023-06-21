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
const DeliveryService_1 = require("../services/DeliveryService");
const OrderService_1 = require("../services/OrderService");
const orderStatus_1 = require("../enums/orderStatus");
const autoBind = require('auto-bind');
class DeliveryController {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.deliveryService = DeliveryService_1.DeliveryService.getInstance();
        this.orderService = OrderService_1.OrderService.getInstance();
        autoBind(this);
    }
    addDelivery(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("DeliveryController - addDelivery()");
            if (req.body) {
                const delivery = req.body;
                const orderId = delivery.orderId;
                let order = yield this.orderService.getOrderById(orderId);
                let remaining = false;
                if (order) {
                    order.items.map(orderItem => {
                        delivery.items.map(deliveryItem => {
                            if (orderItem.itemId == deliveryItem.itemId) {
                                orderItem.delivered = deliveryItem.delivered;
                                if (orderItem.delivered < orderItem.qty)
                                    remaining = true;
                            }
                        });
                    });
                    if (remaining)
                        order.status = orderStatus_1.OrderStatus.partiallyDelivered;
                    else
                        order.status = orderStatus_1.OrderStatus.delivered;
                    const result = yield this.orderService.editOrder(order._id, order);
                    if (result) {
                        yield this.deliveryService.addDelivery(delivery)
                            .then(data => {
                            res.status(200).send(data);
                        })
                            .catch(error => {
                            this.logger.error(error.message);
                            res.status(500).send({ err: error.message });
                        });
                    }
                    else {
                        this.logger.error('Error updating order');
                        res.status(500).send({ err: 'Error updating order status' });
                    }
                }
                else {
                    this.logger.error('Error getting order');
                    res.status(500).send({ err: 'Error getting order details' });
                }
            }
        });
    }
    viewDeliveries(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("DeliveryController - viewDeliveries()");
            yield this.deliveryService.viewDeliveries()
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    getDeliveryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("DeliveryController - getDeliveryById()");
            const id = req.params.id;
            yield this.deliveryService.getDeliveryById(id)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    editDelivery(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("DeliveryController - editDelivery()");
            const id = req.params.id;
            if (req.body) {
                const delivery = req.body;
                const orderId = delivery.orderId;
                let order = yield this.orderService.getOrderById(orderId);
                let remaining = false;
                if (order) {
                    order.items.map(orderItem => {
                        delivery.items.map(deliveryItem => {
                            if (orderItem.itemId == deliveryItem.itemId) {
                                orderItem.delivered = deliveryItem.delivered;
                                if (orderItem.delivered < orderItem.qty)
                                    remaining = true;
                            }
                        });
                    });
                    if (remaining)
                        order.status = orderStatus_1.OrderStatus.partiallyDelivered;
                    else
                        order.status = orderStatus_1.OrderStatus.delivered;
                    const result = yield this.orderService.editOrder(order._id, order);
                    if (result) {
                        yield this.deliveryService.editDelivery(id, delivery)
                            .then(data => {
                            res.status(200).send(data);
                        })
                            .catch(error => {
                            this.logger.error(error.message);
                            res.status(500).send({ err: error.message });
                        });
                    }
                    else {
                        this.logger.error('Error updating order');
                        res.status(500).send({ err: 'Error updating order status' });
                    }
                }
                else {
                    this.logger.error('Error getting order');
                    res.status(500).send({ err: 'Error getting order details' });
                }
            }
        });
    }
    deleteDelivery(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("DeliveryController - deleteDelivery()");
            const id = req.params.id;
            const delivery = yield this.deliveryService.getDeliveryById(id);
            if (delivery) {
                const orderId = delivery.orderId;
                let order = yield this.orderService.getOrderById(orderId);
                let remaining = false;
                if (order) {
                    order.items.map(orderItem => {
                        delivery.items.map(deliveryItem => {
                            if (orderItem.itemId == deliveryItem.itemId) {
                                orderItem.delivered -= deliveryItem.qty;
                                if (orderItem.delivered < orderItem.qty)
                                    remaining = true;
                            }
                        });
                    });
                    if (remaining)
                        order.status = orderStatus_1.OrderStatus.partiallyDelivered;
                    else
                        order.status = orderStatus_1.OrderStatus.delivered;
                    const result = yield this.orderService.editOrder(order._id, order);
                    if (result) {
                        yield this.deliveryService.deleteDelivery(id)
                            .then(data => {
                            res.status(200).send(data);
                        })
                            .catch(error => {
                            this.logger.error(error.message);
                            res.status(500).send({ err: error.message });
                        });
                    }
                    else {
                        this.logger.error('Error updating order');
                        res.status(500).send({ err: 'Error updating order status' });
                    }
                }
                else {
                    this.logger.error('Error getting order');
                    res.status(500).send({ err: 'Error getting order details' });
                }
            }
        });
    }
}
exports.default = DeliveryController;
//# sourceMappingURL=DeliveryController.js.map