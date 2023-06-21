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
const CategoryService_1 = require("../services/CategoryService");
const autoBind = require('auto-bind');
class CategoryController {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.categoryService = CategoryService_1.CategoryService.getInstance();
        autoBind(this);
    }
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("CategoryController - createCategory()");
            if (req.body) {
                yield this.categoryService.createCategory(req.body)
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
    getAllCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("CategoryController - getAllCategory()");
            yield this.categoryService.getAllCategory()
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    getCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("CategoryController - getCategoryById()");
            const id = req.params.id;
            yield this.categoryService.getCategoryById(id)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("CategoryController - updateCategory()");
            const id = req.params.id;
            const category = req.body;
            yield this.categoryService.updateCategory(id, category)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("CategoryController - deleteCategory()");
            const id = req.params.id;
            yield this.categoryService.deleteCategory(id)
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
exports.default = CategoryController;
//# sourceMappingURL=CategoryController.js.map