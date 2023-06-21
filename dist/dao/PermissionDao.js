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
exports.PermissionDao = void 0;
const logger_1 = require("../loaders/logger");
const Permission_1 = require("../models/Permission");
class PermissionDao {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new PermissionDao();
        }
        return this.instance;
    }
    save(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("PermissionDao - save()");
            const permission = new Permission_1.default(request);
            // Increment permission ID
            let latestPermission = yield Permission_1.default.find().sort({ createdAt: -1 }).limit(1);
            if (latestPermission.length > 0) {
                permission.permissionId = latestPermission[0].permissionId + 1;
            }
            else {
                permission.permissionId = 1;
            }
            return yield permission.save()
                .then(data => {
                this.logger.info(`Permission ${data.name} Inserted Successfully`);
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
            this.logger.info("PermissionDao - getAll()");
            return yield Permission_1.default.find({})
                .then(data => {
                if (data.length > 0) {
                    this.logger.info(`Permission Retrieved Successfully`);
                }
                else {
                    this.logger.info(`Permission Not Found`);
                }
                return data;
            })
                .catch(error => {
                this.logger.error("Error in retrieving categories" + error.message);
                throw error;
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("PermissionDao - getById()");
            return yield Permission_1.default.findById(id)
                .then(data => {
                if (data) {
                    this.logger.info(`${data.name} Permission Retrieved Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Permission ${id} Not Found`);
                    return { msg: "Permission Not Found" };
                }
            })
                .catch(error => {
                this.logger.error(`Error in retrieving permission ${id} ${error.message}`);
                throw error;
            });
        });
    }
    update(id, permission) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("PermissionDao - update()");
            return yield Permission_1.default.findByIdAndUpdate(id, { $set: permission }, { new: true })
                .then(data => {
                if (data) {
                    this.logger.info(`${data.name} Permission Updated Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Permission ${id} Not Found`);
                    return { msg: "Permission Not Found" };
                }
            })
                .catch(error => {
                this.logger.error(`Error in updating Permission ${id} ${error.message}`);
                throw error;
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("PermissionDao - delete()");
            return yield Permission_1.default.findByIdAndDelete(id)
                .then(data => {
                if (data) {
                    this.logger.info(`${data.name} Permission Deleted Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Permission ${id} Not Found`);
                    return { msg: "Permission Not Found" };
                }
            })
                .catch(error => {
                this.logger.error(`Error in deleting Permission ${id} ${error.message}`);
                throw error;
            });
        });
    }
}
exports.PermissionDao = PermissionDao;
PermissionDao.instance = null;
//# sourceMappingURL=PermissionDao.js.map