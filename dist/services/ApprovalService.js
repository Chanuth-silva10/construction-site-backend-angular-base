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
exports.ApprovalService = void 0;
const logger_1 = require("../loaders/logger");
const ApprovalDao_1 = require("../dao/ApprovalDao");
class ApprovalService {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.ApprovalDao = ApprovalDao_1.ApprovalDao.getInstance();
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new ApprovalService();
        }
        return this.instance;
    }
    addApproval(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Approval Services - createApproval()");
            return yield this.ApprovalDao.save(request)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    getAllApprovals() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Approval Services - getAllApprovals()");
            return yield this.ApprovalDao.getAll()
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    getApprovalById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Approval Services - getApprovalById()");
            return yield this.ApprovalDao.getById(id)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    editApproval(id, Approval) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Approval Services - updateApproval()");
            return yield this.ApprovalDao.update(id, Approval)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    removeApproval(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Approval Services - deleteApproval()");
            return yield this.ApprovalDao.delete(id)
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
exports.ApprovalService = ApprovalService;
ApprovalService.instance = null;
//# sourceMappingURL=ApprovalService.js.map