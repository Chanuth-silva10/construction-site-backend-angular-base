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
exports.RulesService = void 0;
const logger_1 = require("../loaders/logger");
const RulesDao_1 = require("../dao/RulesDao");
class RulesService {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.RulesDao = RulesDao_1.RulesDao.getInstance();
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new RulesService();
        }
        return this.instance;
    }
    createRules(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Rules Services - createRules()");
            return yield this.RulesDao.save(request)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    getAllRules() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Rules Services - getAllRules()");
            return yield this.RulesDao.getAll()
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    getRulesById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Rules Services - getRulesById()");
            return yield this.RulesDao.getById(id)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    updateRules(id, rules) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Customer Services - updateCustomer()");
            return yield this.RulesDao.update(id, rules)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    deleteRules(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Rules Services - deleteRules()");
            return yield this.RulesDao.delete(id)
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
exports.RulesService = RulesService;
RulesService.instance = null;
//# sourceMappingURL=RulesService.js.map