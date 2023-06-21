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
const EmployeeService_1 = require("../services/EmployeeService");
const LoginService_1 = require("../services/LoginService");
const mime = require("mime");
const fs = require("fs");
const autoBind = require('auto-bind');
const bcrypt = require('bcrypt');
class EmployeeController {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.employeeService = EmployeeService_1.EmployeeService.getInstance();
        this.loginService = LoginService_1.LoginService.getInstance();
        autoBind(this);
    }
    addEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("EmployeeController - addEmployee()");
            let employee;
            let login;
            if (req.body) {
                employee = req.body;
                login = req.body;
            }
            if (employee) {
                yield this.employeeService.addEmployee(employee)
                    .then((data) => __awaiter(this, void 0, void 0, function* () {
                    if (data._id) {
                        // Set employee ID as corresponding login ID
                        login._id = data._id.toString();
                        // Encrypt password
                        login.password = bcrypt.hashSync(login.password, 8);
                        yield this.loginService.createLogin(login)
                            .then(() => {
                            res.status(200).send(data);
                        })
                            .catch(error => {
                            this.logger.error(error.message);
                            res.status(500).send({ err: error.message });
                        });
                    }
                }))
                    .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({ err: error.message });
                });
            }
        });
    }
    viewEmployees(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("EmployeeController - viewEmployees()");
            yield this.employeeService.viewEmployees()
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    getEmployeeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("EmployeeController - getEmployeeById()");
            const id = req.params.id;
            yield this.employeeService.getEmployeeById(id)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    getEmployeeByType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("EmployeeController - getEmployeeByType()");
            const type = req.params.type;
            yield this.employeeService.getEmployeeByType(type)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    editEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("EmployeeController - editEmployee()");
            let employee;
            let login;
            const id = req.params.id;
            if (req.body) {
                employee = JSON.parse(req.body.data);
                login = JSON.parse(req.body.data);
            }
            if (employee) {
                if (req.file)
                    employee.avatar = req.file.filename;
                yield this.employeeService.editEmployee(id, employee)
                    .then((data) => __awaiter(this, void 0, void 0, function* () {
                    if ('_id' in data) {
                        // Encrypt password
                        if (login.password) {
                            login.password = bcrypt.hashSync(login.password, 8);
                        }
                        yield this.loginService.updateLogin(id, login)
                            .then(() => {
                            res.status(200).send(data);
                        })
                            .catch(error => {
                            this.logger.error(error.message);
                            res.status(500).send({ err: error.message });
                        });
                    }
                    else {
                        res.status(404).send(data);
                    }
                }))
                    .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({ err: error.message });
                });
            }
        });
    }
    updateEmployeeStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('EmployeeController - updateEmployeeStatus()');
            const id = req.body.id;
            const status = req.body.status;
            yield this.employeeService.updateEmployeeStatus(id, status)
                .then(data => {
                res.status(200).send(data);
            })
                .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({ err: error.message });
            });
        });
    }
    updateEmployeePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('EmployeeController - updateEmployeePassword()');
            if (req.body) {
                const id = req.params.id;
                const email = req.body.email;
                const currentPassword = req.body.currentPassword;
                const newPassword = req.body.newPassword;
                yield this.loginService.getLogin(email)
                    .then(data => {
                    if ('_id' in data) {
                        if (bcrypt.compareSync(currentPassword, data.password)) {
                            const login = {
                                email: email,
                                password: bcrypt.hashSync(newPassword, 8)
                            };
                            this.loginService.updateLogin(id, login)
                                .then(() => {
                                res.status(200).send(data);
                            })
                                .catch(error => {
                                this.logger.error(error.message);
                                res.status(500).send({ err: error.message });
                            });
                        }
                        else {
                            res.status(401).send({ msg: 'Password invalid' });
                        }
                    }
                    else {
                        res.status(404).send(data);
                    }
                })
                    .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({ err: error.message });
                });
            }
        });
    }
    deleteEmployee(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info("EmployeeController - deleteEmployee()");
            const id = req.params.id;
            yield this.loginService.deleteLogin(id).then(data => {
                this.employeeService.deleteEmployee(id)
                    .then(data => {
                    res.status(200).send(data);
                })
                    .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({ err: error.message });
                });
            });
        });
    }
    getEmployeeAvatar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('EmployeeController - getEmployeeAvatar()');
            // Define filename and path
            const filename = req.params.name;
            const path = `./public/uploads/images/employee/${filename}`;
            // Create a mime-type and set it as the content type in the response header
            const mimeType = mime.lookup(path);
            res.contentType(mimeType);
            // Open the file as a readable stream and pipe it to the response object
            let readStream = fs.createReadStream(path);
            readStream.on('open', () => {
                readStream.pipe(res);
            });
            // Catch errors if they occur
            readStream.on('error', err => {
                logger_1.Logger.getInstance().error(`Image ${filename} not found`);
                res.status(404).send(err);
            });
        });
    }
}
exports.default = EmployeeController;
//# sourceMappingURL=EmployeeController.js.map