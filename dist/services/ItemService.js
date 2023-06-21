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
exports.ItemService = void 0;
const logger_1 = require("../loaders/logger");
const ItemDao_1 = require("../dao/ItemDao");
const CategoryService_1 = require("./CategoryService");
class ItemService {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.ItemDao = ItemDao_1.ItemDao.getInstance();
        this.categoryService = CategoryService_1.CategoryService.getInstance();
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new ItemService();
        }
        return this.instance;
    }
    addItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Item Services - createItem()");
            return yield this.ItemDao.save(item)
                .then(data => {
                item.categories.map(category => {
                    this.categoryService.addItemToCategory(category, data._id);
                });
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    getAllItems() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Item Services - getAllItems()");
            return yield this.ItemDao.getAll()
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    getItemById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Item Services - getItemById()");
            return yield this.ItemDao.getById(id)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    editItem(id, Item) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Item Services - updateItem()");
            return yield this.ItemDao.update(id, Item)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    removeItem(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Item Services - deleteItem()");
            return yield this.ItemDao.delete(id)
                .then((data) => {
                data.categories.map(category => {
                    this.categoryService.removeItemFromCategory(category, data._id);
                });
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    getItemBySupplierId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Item Services - getItemBySupplierId()");
            return yield this.ItemDao.getBySupplierId(id)
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
exports.ItemService = ItemService;
ItemService.instance = null;
//# sourceMappingURL=ItemService.js.map