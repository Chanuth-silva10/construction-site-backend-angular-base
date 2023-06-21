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
exports.EmployeeService = void 0;
const logger_1 = require("../loaders/logger");
const EmployeeDao_1 = require("../dao/EmployeeDao");
class EmployeeService {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.employeeDao = EmployeeDao_1.EmployeeDao.getInstance();
    }
    static getInstance() {
        if (this.instance === null) {
            this.instance = new EmployeeService();
        }
        return this.instance;
    }
    addEmployee(request) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('EmployeeService - addEmployee()');
            return yield this.employeeDao.save(request)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    viewEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('EmployeeService - viewEmployees()');
            return yield this.employeeDao.getAll()
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    getEmployeeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('EmployeeService - getEmployeeById()');
            return yield this.employeeDao.getById(id)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    getEmployeeByType(type) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('EmployeeService - getEmployeeByType()');
            return yield this.employeeDao.getByType(type)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    editEmployee(id, employee) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('EmployeeService - editEmployee()');
            return yield this.employeeDao.update(id, employee)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    updateEmployeeStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("Employee Services - updateEmployeeStatus()");
            return yield this.employeeDao.updateStatus(id, status)
                .then(data => {
                return data;
            })
                .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
        });
    }
    deleteEmployee(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('EmployeeService - deleteEmployee()');
            return yield this.employeeDao.delete(id)
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
exports.EmployeeService = EmployeeService;
EmployeeService.instance = null;
//# sourceMappingURL=EmployeeService.js.map