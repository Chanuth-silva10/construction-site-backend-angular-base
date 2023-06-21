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
exports.RulesDao = void 0;
const logger_1 = require("../loaders/logger");
const Rules_1 = require("../models/Rules");
class RulesDao {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new RulesDao();
        }
        return this.instance;
    }
    save(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("RulesDao - save()");
            const rules = new Rules_1.default(request);
            return yield rules.save()
                .then(data => {
                this.logger.info(`Rules ${data.name} Inserted Successfully`);
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
            this.logger.info("RulesDao - getAll()");
            return yield Rules_1.default.find({})
                .then(data => {
                if (data.length > 0) {
                    this.logger.info(`Rules Retrieved Successfully`);
                }
                else {
                    this.logger.info(`Rules Not Found`);
                }
                return data;
            })
                .catch(error => {
                this.logger.error("Error in retrieving rules" + error.message);
                throw error;
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("RulesDao - getById()");
            return yield Rules_1.default.findById(id)
                .then(data => {
                if (data) {
                    this.logger.info(`${data.name} Rules Retrieved Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Rules ${id} Not Found`);
                    return { msg: "Category Not Found" };
                }
            })
                .catch(error => {
                this.logger.error(`Error in retrieving Rules ${id} ${error.message}`);
                throw error;
            });
        });
    }
    update(id, category) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("RulesDao - update()");
            return yield Rules_1.default.findByIdAndUpdate(id, { $set: category }, { new: true })
                .then(data => {
                if (data) {
                    this.logger.info(`${data.name} Rules
                     Updated Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Rules ${id} Not Found`);
                    return { msg: "Rules Not Found" };
                }
            })
                .catch(error => {
                this.logger.error(`Error in updating Rules ${id} ${error.message}`);
                throw error;
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("RulesDao - delete()");
            return yield Rules_1.default.findByIdAndDelete(id)
                .then(data => {
                if (data) {
                    this.logger.info(`${data.name} Rules Deleted Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Rules ${id} Not Found`);
                    return { msg: "Rules Not Found" };
                }
            })
                .catch(error => {
                this.logger.error(`Error in deleting Rules ${id} ${error.message}`);
                throw error;
            });
        });
    }
}
exports.RulesDao = RulesDao;
RulesDao.instance = null;
//# sourceMappingURL=RulesDao.js.map