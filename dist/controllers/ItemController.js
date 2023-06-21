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
const ItemService_1 = require("../services/ItemService");
const autoBind = require('auto-bind');
class ItemController {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.ItemService = ItemService_1.ItemService.getInstance();
        autoBind(this);
    }
    addItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("ItemController - addItem()");
            if (req.body) {
                yield this.ItemService.addItem(req.body)
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
    getAllItems(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("ItemController - getAllItems()");
            yield this.ItemService.getAllItems()
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    getItemById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("ItemController - getItemById()");
            const id = req.params.id;
            yield this.ItemService.getItemById(id)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    getItemsBySupplierId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("ItemController - getItemsBySupplierId()");
            const id = req.params.id;
            yield this.ItemService.getItemBySupplierId(id)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    editItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("ItemController - editItem()");
            const id = req.params.id;
            const Item = req.body;
            yield this.ItemService.editItem(id, Item)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    removeItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("ItemController - removeItem()");
            const id = req.params.id;
            yield this.ItemService.removeItem(id)
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
exports.default = ItemController;
//# sourceMappingURL=ItemController.js.map