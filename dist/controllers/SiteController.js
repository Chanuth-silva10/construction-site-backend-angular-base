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
const SiteService_1 = require("../services/SiteService");
const autoBind = require('auto-bind');
class SiteController {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.siteService = SiteService_1.SiteService.getInstance();
        autoBind(this);
    }
    createSite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("SiteController - createSite()");
            if (req.body) {
                yield this.siteService.createSite(req.body)
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
    getAllSite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("SiteController - getAllSite()");
            yield this.siteService.getAllSite()
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    getSiteById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("SiteController - getSiteById()");
            const id = req.params.id;
            yield this.siteService.getSiteById(id)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    updateSite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("SiteController - updateSite()");
            const id = req.params.id;
            const site = req.body;
            yield this.siteService.updateSite(id, site)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    deleteSite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("SiteController - deleteSite()");
            const id = req.params.id;
            yield this.siteService.deleteSite(id)
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
exports.default = SiteController;
//# sourceMappingURL=SiteController.js.map