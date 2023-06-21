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
exports.SiteService = void 0;
const logger_1 = require("../loaders/logger");
const SiteDao_1 = require("../dao/SiteDao");
class SiteService {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.SiteDao = SiteDao_1.SiteDao.getInstance();
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new SiteService();
        }
        return this.instance;
    }
    createSite(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Site Services - createSite()");
            return yield this.SiteDao.save(request)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    getAllSite() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Site Services - getAllSite()");
            return yield this.SiteDao.getAll()
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    getSiteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Site Services - getSiteById()");
            return yield this.SiteDao.getById(id)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    updateSite(id, site) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Site Services - updateSite()");
            return yield this.SiteDao.update(id, site)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    deleteSite(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Site Services - deleteSite()");
            return yield this.SiteDao.delete(id)
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
exports.SiteService = SiteService;
SiteService.instance = null;
//# sourceMappingURL=SiteService.js.map