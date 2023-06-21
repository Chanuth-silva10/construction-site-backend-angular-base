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
exports.ApprovalDao = void 0;
const logger_1 = require("../loaders/logger");
const Approval_1 = require("../models/Approval");
class ApprovalDao {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new ApprovalDao();
        }
        return this.instance;
    }
    save(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("ApprovalDao - add()");
            const approval = new Approval_1.default(request);
            return yield approval.save()
                .then(data => {
                this.logger.info(`Approval ${data.status} Inserted Successfully`);
                return data;
            })
                .catch(error => {
                this.logger.error("Error in inserting Approval" + error.message);
                throw error;
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("ApprovalDao - getAll()");
            return yield Approval_1.default.find({})
                .then(data => {
                if (data.length > 0) {
                    this.logger.info(`Approvals Retrieved Successfully`);
                }
                else {
                    this.logger.info(`Approvals Not Found`);
                }
                return data;
            })
                .catch(error => {
                this.logger.error("Error in retrieving Approvals" + error.message);
                throw error;
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("ApprovalDao - getById()");
            return yield Approval_1.default.findById(id)
                .then(data => {
                if (data) {
                    this.logger.info(`${data.status} Approval Retrieved Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Approval ${id} Not Found`);
                    return { msg: "Approval Not Found" };
                }
            })
                .catch(error => {
                this.logger.error(`Error in retrieving Approval ${id} ${error.message}`);
                throw error;
            });
        });
    }
    update(id, item) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("ApprovalDao - update()");
            return yield Approval_1.default.findByIdAndUpdate(id, { $set: item }, { new: true })
                .then(data => {
                if (data) {
                    this.logger.info(`${data.status} Approval Updated Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Approval ${id} Not Found`);
                    return { msg: "Approval Not Found" };
                }
            })
                .catch(error => {
                this.logger.error(`Error in updating Approval ${id} ${error.message}`);
                throw error;
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("ApprovalDao - delete()");
            return yield Approval_1.default.findByIdAndDelete(id)
                .then(data => {
                if (data) {
                    this.logger.info(`${data.status} Approval Deleted Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Approval ${id} Not Found`);
                    return { msg: "Approval Not Found" };
                }
            })
                .catch(error => {
                this.logger.error(`Error in deleting Approval ${id} ${error.message}`);
                throw error;
            });
        });
    }
}
exports.ApprovalDao = ApprovalDao;
ApprovalDao.instance = null;
//# sourceMappingURL=ApprovalDao.js.map