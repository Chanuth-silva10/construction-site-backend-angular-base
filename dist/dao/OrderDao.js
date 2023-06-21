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
exports.OrderDao = void 0;
const logger_1 = require("../loaders/logger");
const Order_1 = require("../models/Order");
class OrderDao {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new OrderDao();
        }
        return this.instance;
    }
    save(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('OrderDao - save()');
            const order = new Order_1.default(request);
            // Increment order ID
            let latestOrder = yield Order_1.default.find().sort({ createdAt: -1 }).limit(1);
            if (latestOrder.length > 0) {
                order.orderReferenceNo = latestOrder[0].orderReferenceNo + 1;
            }
            else {
                order.orderReferenceNo = 1000;
            }
            return yield order.save()
                .then(data => {
                this.logger.info(`Order ${data._id} Inserted Successfully`);
                return data;
            })
                .catch(error => {
                this.logger.error('Error in inserting order' + error.message);
                throw error;
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('OrderDao - getAll()');
            return yield Order_1.default.find({}).populate(['supplier', 'site'])
                .then(data => {
                if (data.length > 0) {
                    this.logger.info('Orders Retrieved Successfully');
                }
                else {
                    this.logger.error('Orders Not Found');
                }
                return data;
            })
                .catch(error => {
                this.logger.error('Error in retrieving orders' + error.message);
                throw error;
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('OrderDao - getById()');
            return yield Order_1.default.findById(id).populate(['supplier', 'items.itemId', 'site'])
                .then(data => {
                if (data) {
                    this.logger.info(`${id} Order Retrieved Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Order ${id} Not Found`);
                    return { msg: 'Order Not Found' };
                }
            })
                .catch(error => {
                this.logger.error(`Error in retrieving order ${id} ${error.message}`);
                throw error;
            });
        });
    }
    getByStatus(status) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('OrderDao - getByStatus()');
            return yield Order_1.default.find({ status: status }).populate(['supplier', 'site'])
                .then(data => {
                console.log(data);
                if (data) {
                    this.logger.info(`Orders of ${status} Retrieved Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Orders of ${status} Not Found`);
                    return { msg: 'Order Not Found' };
                }
            })
                .catch(error => {
                // this.logger.error(`Error in retrieving order ${id} ${error.message}`);
                throw error;
            });
        });
    }
    addComment(id, comment) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('OrderDao - addComment()');
            return yield Order_1.default.findByIdAndUpdate(id, { $addToSet: { comments: comment } }, { new: true })
                .then(data => {
                if (data) {
                    this.logger.info(`Comment added to order Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Order ${id} Not Found`);
                    return { msg: 'Order Not Found' };
                }
            })
                .catch(error => {
                this.logger.error(`Error in updating order ${id} ${error.message}`);
                throw error;
            });
        });
    }
    update(id, order) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('OrderDao - update()');
            return yield Order_1.default.findByIdAndUpdate(id, { $set: order }, { new: true })
                .then(data => {
                if (data) {
                    this.logger.info(`${id} Order Updated Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Order ${id} Not Found`);
                    return { msg: 'Order Not Found' };
                }
            })
                .catch(error => {
                this.logger.error(`Error in updating order ${id} ${error.message}`);
                throw error;
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('OrderDao - delete()');
            return yield Order_1.default.findByIdAndDelete(id)
                .then(data => {
                if (data) {
                    this.logger.info(`${id} Order Deleted Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Order ${id} Not Found`);
                    return { msg: 'Order Not Found' };
                }
            })
                .catch(error => {
                this.logger.error(`Error in deleting order ${id} ${error.message}`);
                throw error;
            });
        });
    }
}
exports.OrderDao = OrderDao;
OrderDao.instance = null;
//# sourceMappingURL=OrderDao.js.map