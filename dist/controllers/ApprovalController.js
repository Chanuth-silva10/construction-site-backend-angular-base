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
const ApprovalService_1 = require("../services/ApprovalService");
const autoBind = require('auto-bind');
class ApprovalController {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.ApprovalService = ApprovalService_1.ApprovalService.getInstance();
        autoBind(this);
    }
    addApproval(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("ApprovalController - addApproval()");
            if (req.body) {
                yield this.ApprovalService.addApproval(req.body)
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
    getAllApprovals(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("ApprovalController - getAllApprovals()");
            yield this.ApprovalService.getAllApprovals()
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    getApprovalById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("ApprovalController - getApprovalById()");
            const id = req.params.id;
            yield this.ApprovalService.getApprovalById(id)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    editApproval(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("ApprovalController - editApproval()");
            const id = req.params.id;
            const Approval = req.body;
            yield this.ApprovalService.editApproval(id, Approval)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    removeApproval(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("ApprovalController - removeApproval()");
            const id = req.params.id;
            yield this.ApprovalService.removeApproval(id)
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
exports.default = ApprovalController;
//# sourceMappingURL=ApprovalController.js.map