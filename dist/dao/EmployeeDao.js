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
exports.EmployeeDao = void 0;
const logger_1 = require("../loaders/logger");
const Employee_1 = require("../models/Employee");
class EmployeeDao {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new EmployeeDao();
        }
        return this.instance;
    }
    save(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('EmployeeDao - save()');
            const employee = new Employee_1.default(request);
            // Increment employee ID
            let latestEmployee = yield Employee_1.default.find().sort({ payDate: -1 }).limit(1);
            if (latestEmployee.length > 0) {
                employee.empId = latestEmployee[0].empId + 1;
            }
            else {
                employee.empId = 1000;
            }
            return yield employee.save()
                .then(data => {
                this.logger.info(`Employee ${data._id} Inserted Successfully`);
                return data;
            })
                .catch(error => {
                this.logger.error('Error in inserting employee' + error.message);
                throw error;
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('EmployeeDao - getAll()');
            return yield Employee_1.default.find({})
                .then(data => {
                if (data.length > 0) {
                    this.logger.info('Employees Retrieved Successfully');
                }
                else {
                    this.logger.error('Employees Not Found');
                }
                return data;
            })
                .catch(error => {
                this.logger.error('Error in retrieving employees' + error.message);
                throw error;
            });
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('EmployeeDao - getById()');
            return yield Employee_1.default.findById(id)
                .then(data => {
                if (data) {
                    this.logger.info(`${id} Employee Retrieved Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Employee ${id} Not Found`);
                    return { msg: 'Employee Not Found' };
                }
            })
                .catch(error => {
                this.logger.error(`Error in retrieving employee ${id} ${error.message}`);
                throw error;
            });
        });
    }
    update(id, employee) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('EmployeeDao - update()');
            return yield Employee_1.default.findByIdAndUpdate(id, { $set: employee }, { new: true })
                .then(data => {
                if (data) {
                    this.logger.info(`${id} Employee Updated Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Employee ${id} Not Found`);
                    return { msg: 'Employee Not Found' };
                }
            })
                .catch(error => {
                this.logger.error(`Error in updating employee ${id} ${error.message}`);
                throw error;
            });
        });
    }
    updateStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("EmployeeDao - updateStatus()");
            return yield Employee_1.default.findByIdAndUpdate(id, { $set: { status: status } }, { new: true })
                .then(data => {
                if (data) {
                    this.logger.info(`${data.firstName} ${data.lastName} Employee Status Updated Successfully to ${status}`);
                    return data;
                }
                else {
                    this.logger.info(`Employee ${id} Not Found`);
                    return { msg: "Employee Not Found" };
                }
            })
                .catch(error => {
                this.logger.error(`Error in updating employee ${id} ${error.message}`);
                throw error;
            });
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('EmployeeDao - delete()');
            return yield Employee_1.default.findByIdAndDelete(id)
                .then(data => {
                if (data) {
                    this.logger.info(`${id} Employee Deleted Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Employee ${id} Not Found`);
                    return { msg: 'Employee Not Found' };
                }
            })
                .catch(error => {
                this.logger.error(`Error in deleting employee ${id} ${error.message}`);
                throw error;
            });
        });
    }
    getByType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('EmployeeDao - getByType()');
            return yield Employee_1.default.find({ "type": { $regex: type, $options: "i" } })
                .then(data => {
                if (data) {
                    this.logger.info(`${type} Employee Retrieved Successfully`);
                    return data;
                }
                else {
                    this.logger.info(`Employees of ${type} type Not Found`);
                    return { msg: `${type} Employees not found` };
                }
            })
                .catch(error => {
                this.logger.error(`Error in retrieving employee of type ${type} ${error.message}`);
                throw error;
            });
        });
    }
}
exports.EmployeeDao = EmployeeDao;
EmployeeDao.instance = null;
//# sourceMappingURL=EmployeeDao.js.map