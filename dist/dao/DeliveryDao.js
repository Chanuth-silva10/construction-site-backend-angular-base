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
exports.DeliveryDao = void 0;
const logger_1 = require("../loaders/logger");
const Delivery_1 = require("../models/Delivery");
class DeliveryDao {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new DeliveryDao();
        }
        return this.instance;
    }
    save(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('DeliveryDao - save()');
            const delivery = new Delivery_1.default(request);
            // Increment delivery ID
            let latestDelivery = yield Delivery_1.default.find().sort({ date: -1 }).limit(1);
            if (latestDelivery.length > 0) {
                delivery.deliveryId = latestDelivery[0].deliveryId + 1;
            }
            else {
                delivery.deliveryId = 1000;
            }
            return yield delivery.save()
                .then(data => {
                this.logger.info(`Delivery ${data._id} Inserted Successfully`);
                return data;
            })
                .catch(error => {
                this.logger.error('Error in inserting delivery' + error.message);
                throw error;
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('DeliveryDao - getAll()');
            return yield Delivery_1.default.find({}).populate(['supplierId', 'orderId'])
                .then(data => {
                if (data.length > 0) {
                    this.logger.info('Deliverys Retrieved Successfully');
                }
                else {
                    this.logger.error('Deliverys Not Found');
                }
                return data;
            })
                .catch(error => {
                this.logger.error('Error in retrieving deliverys' + error.message);
                throw error;
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('DeliveryDao - getById()');
            return yield Delivery_1.default.findById(id)
                .then(data => {
                if (data) {
                    this.logger.info(`${id} Delivery Retrieved Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Delivery ${id} Not Found`);
                    return { msg: 'Delivery Not Found' };
                }
            })
                .catch(error => {
                this.logger.error(`Error in retrieving delivery ${id} ${error.message}`);
                throw error;
            });
        });
    }
    update(id, delivery) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('DeliveryDao - update()');
            return yield Delivery_1.default.findByIdAndUpdate(id, { $set: delivery }, { new: true })
                .then(data => {
                if (data) {
                    this.logger.info(`${id} Delivery Updated Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Delivery ${id} Not Found`);
                    return { msg: 'Delivery Not Found' };
                }
            })
                .catch(error => {
                this.logger.error(`Error in updating delivery ${id} ${error.message}`);
                throw error;
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('DeliveryDao - delete()');
            return yield Delivery_1.default.findByIdAndDelete(id)
                .then(data => {
                if (data) {
                    this.logger.info(`${id} Delivery Deleted Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Delivery ${id} Not Found`);
                    return { msg: 'Delivery Not Found' };
                }
            })
                .catch(error => {
                this.logger.error(`Error in deleting delivery ${id} ${error.message}`);
                throw error;
            });
        });
    }
}
exports.DeliveryDao = DeliveryDao;
DeliveryDao.instance = null;
//# sourceMappingURL=DeliveryDao.js.map