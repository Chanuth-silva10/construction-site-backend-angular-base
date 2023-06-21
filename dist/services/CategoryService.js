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
exports.CategoryService = void 0;
const logger_1 = require("../loaders/logger");
const CategoryDao_1 = require("../dao/CategoryDao");
class CategoryService {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.CategoryDao = CategoryDao_1.CategoryDao.getInstance();
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new CategoryService();
        }
        return this.instance;
    }
    createCategory(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Category Services - createCategory()");
            return yield this.CategoryDao.save(request)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    getAllCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Category Services - getAllCategory()");
            return yield this.CategoryDao.getAll()
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Category Services - getCategoryById()");
            return yield this.CategoryDao.getById(id)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    updateCategory(id, category) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Category Services - updateCategory()");
            return yield this.CategoryDao.update(id, category)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    addItemToCategory(id, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Category Services - addItemToCategory()");
            return yield this.CategoryDao.addItem(id, itemId)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    removeItemFromCategory(id, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Category Services - removeItemFromCategory()");
            return yield this.CategoryDao.removeItem(id, itemId)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Category Services - deleteCategory()");
            return yield this.CategoryDao.delete(id)
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
exports.CategoryService = CategoryService;
CategoryService.instance = null;
//# sourceMappingURL=CategoryService.js.map