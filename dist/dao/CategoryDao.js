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
exports.CategoryDao = void 0;
const logger_1 = require("../loaders/logger");
const Category_1 = require("../models/Category");
class CategoryDao {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new CategoryDao();
        }
        return this.instance;
    }
    save(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("CategoryDao - save()");
            const category = new Category_1.default(request);
            return yield category.save()
                .then(data => {
                this.logger.info(`Category ${data.name} Inserted Successfully`);
                return data;
            })
                .catch(error => {
                this.logger.error("Error in inserting product" + error.message);
                throw error;
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("CategoryDao - getAll()");
            return yield Category_1.default.find({})
                .then(data => {
                if (data.length > 0) {
                    this.logger.info(`Category Retrieved Successfully`);
                }
                else {
                    this.logger.info(`Category Not Found`);
                }
                return data;
            })
                .catch(error => {
                this.logger.error("Error in retrieving categories" + error.message);
                throw error;
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("CategoryDao - getById()");
            return yield Category_1.default.findById(id)
                .then(data => {
                if (data) {
                    this.logger.info(`${data.name} Category Retrieved Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Category ${id} Not Found`);
                    return { msg: "Category Not Found" };
                }
            })
                .catch(error => {
                this.logger.error(`Error in retrieving category ${id} ${error.message}`);
                throw error;
            });
        });
    }
    update(id, category) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("CategoryDao - update()");
            return yield Category_1.default.findByIdAndUpdate(id, { $set: category }, { new: true })
                .then(data => {
                if (data) {
                    this.logger.info(`${data.name} Category Updated Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Category ${id} Not Found`);
                    return { msg: "Category Not Found" };
                }
            })
                .catch(error => {
                this.logger.error(`Error in updating Category ${id} ${error.message}`);
                throw error;
            });
        });
    }
    addItem(id, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("CategoryDao - addItem()");
            return yield Category_1.default.findByIdAndUpdate(id, { $addToSet: { items: itemId } }, { new: true })
                .then(data => {
                if (data) {
                    this.logger.info(`Item added to ${data.name} Category Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Category ${id} Not Found`);
                    return { msg: "Category Not Found" };
                }
            })
                .catch(error => {
                this.logger.error(`Error in adding item to Category ${id} ${error.message}`);
                throw error;
            });
        });
    }
    removeItem(id, itemId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("CategoryDao - removeItem()");
            return yield Category_1.default.findByIdAndUpdate(id, { $pull: { items: itemId } }, { new: true })
                .then(data => {
                if (data) {
                    this.logger.info(`Item removed from ${data.name} Category Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Category ${id} Not Found`);
                    return { msg: "Category Not Found" };
                }
            })
                .catch(error => {
                this.logger.error(`Error in removing item from Category ${id} ${error.message}`);
                throw error;
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("CategoryDao - delete()");
            return yield Category_1.default.findByIdAndDelete(id)
                .then(data => {
                if (data) {
                    this.logger.info(`${data.name} Category Deleted Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Category ${id} Not Found`);
                    return { msg: "Category Not Found" };
                }
            })
                .catch(error => {
                this.logger.error(`Error in deleting Category ${id} ${error.message}`);
                throw error;
            });
        });
    }
}
exports.CategoryDao = CategoryDao;
CategoryDao.instance = null;
//# sourceMappingURL=CategoryDao.js.map