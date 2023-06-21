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
const PermissionService_1 = require("../services/PermissionService");
const autoBind = require('auto-bind');
class PermissionController {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.permissionService = PermissionService_1.PermissionService.getInstance();
        autoBind(this);
    }
    createPermission(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("PermissionController - createPermission()");
            if (req.body) {
                yield this.permissionService.createPermission(req.body)
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
    getAllPermission(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("PermissionController - getAllPermission()");
            yield this.permissionService.getAllPermission()
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    getPermissionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("PermissionController - getPermissionById()");
            const id = req.params.id;
            yield this.permissionService.getPermissionById(id)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    updatePermission(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("PermissionController - updatePermission()");
            const id = req.params.id;
            const permission = req.body;
            yield this.permissionService.updatePermission(id, permission)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    deletePermission(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("PermissionController - deletePermission()");
            const id = req.params.id;
            yield this.permissionService.deletePermission(id)
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
exports.default = PermissionController;
//# sourceMappingURL=PermissionController.js.map