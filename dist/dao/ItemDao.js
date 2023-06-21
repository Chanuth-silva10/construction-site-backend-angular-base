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
exports.ItemDao = void 0;
const logger_1 = require("../loaders/logger");
const Item_1 = require("../models/Item");
class ItemDao {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new ItemDao();
        }
        return this.instance;
    }
    save(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("ItemDao - add()");
            const item = new Item_1.default(request);
            return yield item.save()
                .then(data => {
                this.logger.info(`Item ${data.itemName} Inserted Successfully`);
                return data;
            })
                .catch(error => {
                this.logger.error("Error in inserting Item" + error.message);
                throw error;
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("ItemDao - getAll()");
            return yield Item_1.default.find({}).populate("supplier.supplierId")
                .then(data => {
                if (data.length > 0) {
                    this.logger.info(`Items Retrieved Successfully`);
                }
                else {
                    this.logger.info(`Items Not Found`);
                }
                return data;
            })
                .catch(error => {
                this.logger.error("Error in retrieving Items" + error.message);
                throw error;
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("ItemDao - getById()");
            return yield Item_1.default.findById(id)
                .then(data => {
                if (data) {
                    this.logger.info(`${data.itemName} Item Retrieved Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Item ${id} Not Found`);
                    return { msg: "Item Not Found" };
                }
            })
                .catch(error => {
                this.logger.error(`Error in retrieving Item ${id} ${error.message}`);
                throw error;
            });
        });
    }
    getBySupplierId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("ItemDao - getBySupplierId()");
            return yield Item_1.default.find({ "supplier.supplierId": id })
                .then(data => {
                if (data) {
                    this.logger.info(`Items Retrieved Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Item ${id} Not Found`);
                    return { msg: "Item Not Found" };
                }
            })
                .catch(error => {
                this.logger.error(`Error in retrieving Item ${id} ${error.message}`);
                throw error;
            });
        });
    }
    update(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("ItemDao - update()");
            return yield Item_1.default.findByIdAndUpdate(id, { $set: item }, { new: true })
                .then(data => {
                if (data) {
                    this.logger.info(`${data.itemName} Items Retrieved Successfully by Seller`);
                    return data;
                }
                else {
                    this.logger.info(`Seller ${id} Not Found`);
                    return { msg: "Item Not Found" };
                }
            })
                .catch(error => {
                this.logger.error(`Error in updating Item ${id} ${error.message}`);
                throw error;
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("ItemDao - delete()");
            return yield Item_1.default.findByIdAndDelete(id)
                .then(data => {
                if (data) {
                    this.logger.info(`${data.itemName} Item Deleted Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Item ${id} Not Found`);
                    return { msg: "Item Not Found" };
                }
            })
                .catch(error => {
                this.logger.error(`Error in deleting Item ${id} ${error.message}`);
                throw error;
            });
        });
    }
}
exports.ItemDao = ItemDao;
ItemDao.instance = null;
//# sourceMappingURL=ItemDao.js.map