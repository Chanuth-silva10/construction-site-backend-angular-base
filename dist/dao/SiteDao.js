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
exports.SiteDao = void 0;
const logger_1 = require("../loaders/logger");
const Site_1 = require("../models/Site");
class SiteDao {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new SiteDao();
        }
        return this.instance;
    }
    save(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("SiteDao - save()");
            const site = new Site_1.default(request);
            return yield site.save()
                .then(data => {
                this.logger.info(`Site ${data.siteName} Inserted Successfully`);
                return data;
            })
                .catch(error => {
                this.logger.error("Error in inserting site" + error.message);
                throw error;
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("SiteDao - getAll()");
            return yield Site_1.default.find({}).populate('manager')
                .then(data => {
                if (data.length > 0) {
                    this.logger.info(`Site Retrieved Successfully`);
                }
                else {
                    this.logger.info(`Site Not Found`);
                }
                return data;
            })
                .catch(error => {
                this.logger.error("Error in retrieving sites" + error.message);
                throw error;
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("SiteDao - getById()");
            return yield Site_1.default.findById(id)
                .then(data => {
                if (data) {
                    this.logger.info(`${data.siteName} Site Retrieved Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Site ${id} Not Found`);
                    return { msg: "Category Not Found" };
                }
            })
                .catch(error => {
                this.logger.error(`Error in retrieving site ${id} ${error.message}`);
                throw error;
            });
        });
    }
    update(id, site) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("SiteDao - update()");
            return yield Site_1.default.findByIdAndUpdate(id, { $set: site }, { new: true })
                .then(data => {
                if (data) {
                    this.logger.info(`${data.siteName} Site Updated Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Site ${id} Not Found`);
                    return { msg: "Site Not Found" };
                }
            })
                .catch(error => {
                this.logger.error(`Error in updating Site ${id} ${error.message}`);
                throw error;
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("SiteDao - delete()");
            return yield Site_1.default.findByIdAndDelete(id)
                .then(data => {
                if (data) {
                    this.logger.info(`${data.siteName} Site Deleted Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Site ${id} Not Found`);
                    return { msg: "Site Not Found" };
                }
            })
                .catch(error => {
                this.logger.error(`Error in deleting Site ${id} ${error.message}`);
                throw error;
            });
        });
    }
}
exports.SiteDao = SiteDao;
SiteDao.instance = null;
//# sourceMappingURL=SiteDao.js.map