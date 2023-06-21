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
exports.OrderService = void 0;
const logger_1 = require("../loaders/logger");
const OrderDao_1 = require("../dao/OrderDao");
const RulesService_1 = require("./RulesService");
const limitations_1 = require("../enums/limitations");
const orderStatus_1 = require("../enums/orderStatus");
const nodemailer = require("nodemailer");
class OrderService {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.orderDao = OrderDao_1.OrderDao.getInstance();
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new OrderService();
        }
        return this.instance;
    }
    addOrder(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('OrderService - addOrder()');
            const order = request;
            const limitations = yield RulesService_1.RulesService.getInstance().getAllRules();
            if (limitations.length > 0) {
                const orderLimit = limitations.filter(limitation => limitation.name == limitations_1.Limitations.orderLimit);
                if (orderLimit.length > 0) {
                    if (order.total < orderLimit[0].limit) {
                        order.status = orderStatus_1.OrderStatus.placed;
                    }
                    else {
                        order.status = orderStatus_1.OrderStatus.waiting;
                        const approvals = [];
                        if (orderLimit[0].approvalType == "single") {
                            const approval = {
                                status: orderStatus_1.OrderStatus.pending,
                                empType: orderLimit[0].approvals,
                                approvedBy: null
                            };
                            approvals.push(approval);
                        }
                        else {
                            orderLimit[0].approvals.map(empType => {
                                const approval = {
                                    status: orderStatus_1.OrderStatus.pending,
                                    empType: empType,
                                    approvedBy: null
                                };
                                approvals.push(approval);
                            });
                        }
                        order.approvals = approvals;
                    }
                }
            }
            console.log(order);
            return yield this.orderDao.save(request)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    viewOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('OrderService - viewOrders()');
            return yield this.orderDao.getAll()
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('OrderService - getOrderById()');
            return yield this.orderDao.getById(id)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    getOrderByStatusAndEmpType(status, empType) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('OrderService - getOrderById()');
            return yield this.orderDao.getByStatus(status)
                .then(data => {
                const temp = data;
                const orders = [];
                if (!data.hasOwnProperty("msg")) {
                    temp.map(order => {
                        order.approvals.map(approval => {
                            if (approval.status == orderStatus_1.OrderStatus.pending) {
                                if (approval.empType.includes(empType)) {
                                    orders.push(order);
                                }
                            }
                        });
                    });
                }
                return orders;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    updateOrderStatus(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('OrderService - updateOrderStatus()');
            let id = request.id;
            let status = request.status;
            let empType = request.empType;
            let empId = request.empId;
            return yield this.orderDao.getById(id)
                .then((data) => __awaiter(this, void 0, void 0, function* () {
                if (!data.hasOwnProperty("msg")) {
                    const order = data;
                    const requiredApprovals = order.approvals.length;
                    let pendingApprovals = 0;
                    let approvedApprovals = 0;
                    order.approvals.map(approval => {
                        if (approval.status == orderStatus_1.OrderStatus.pending) {
                            pendingApprovals = pendingApprovals + 1;
                            if (approval.empType.includes(empType)) {
                                approvedApprovals = approvedApprovals + 1;
                                approval.approvedBy = empId;
                                approval.status = status;
                            }
                        }
                    });
                    if (status != orderStatus_1.OrderStatus.declined) {
                        if (pendingApprovals == approvedApprovals) {
                            order.status = orderStatus_1.OrderStatus.approved;
                        }
                        else if (approvedApprovals < pendingApprovals) {
                            order.status = orderStatus_1.OrderStatus.partiallyApproved;
                        }
                    }
                    else if (status == orderStatus_1.OrderStatus.declined) {
                        order.status = orderStatus_1.OrderStatus.declined;
                    }
                    return yield this.orderDao.update(id, order)
                        .then(data => {
                        return data;
                    })
                        .catch(error => {
                        this.logger.error(error.message);
                        throw error;
                    });
                }
                else {
                    return data;
                }
            }))
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    editOrder(id, order) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('OrderService - editOrder()');
            return yield this.orderDao.update(id, order)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    addComment(id, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('OrderService - addComment()');
            return yield this.orderDao.addComment(id, comment)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('OrderService - deleteOrder()');
            return yield this.orderDao.delete(id)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    //This method handles sending emails
    sendEmail(email, subject, message) {
        return __awaiter(this, void 0, void 0, function* () {
            //Authenticate the email
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASSWORD
                }
            });
            //Message
            const mailOptions = {
                from: 'Procuro',
                to: email,
                subject: subject,
                text: message
            };
            //Send Email
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                }
            });
        });
    }
}
exports.OrderService = OrderService;
OrderService.instance = null;
//# sourceMappingURL=OrderService.js.map