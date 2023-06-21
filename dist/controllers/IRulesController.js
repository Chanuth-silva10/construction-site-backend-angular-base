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
const RulesService_1 = require("../services/RulesService");
const autoBind = require('auto-bind');
class RulesController {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.rulesService = RulesService_1.RulesService.getInstance();
        autoBind(this);
    }
    createRules(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("RulesController - createRules()");
            if (req.body) {
                yield this.rulesService.createRules(req.body)
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
    getAllRules(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("RulesController - getAllRules()");
            yield this.rulesService.getAllRules()
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    getRulesById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("RulesController - getRulesById()");
            const id = req.params.id;
            yield this.rulesService.getRulesById(id)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    updateRules(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("RulesController - updateRules()");
            const id = req.params.id;
            const Rules = req.body;
            yield this.rulesService.updateRules(id, Rules)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    deleteRules(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("RulesController - deleteRules()");
            const id = req.params.id;
            yield this.rulesService.deleteRules(id)
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
exports.default = RulesController;
//# sourceMappingURL=IRulesController.js.map