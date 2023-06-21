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
const config_1 = require("../config/config");
const logger_1 = require("../loaders/logger");
const LoginService_1 = require("../services/LoginService");
const EmployeeService_1 = require("../services/EmployeeService");
const autoBind = require("auto-bind");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
class LoginController {
    constructor() {
        this.logger = logger_1.Logger.getInstance();
        this.loginService = LoginService_1.LoginService.getInstance();
        this.employeeService = EmployeeService_1.EmployeeService.getInstance();
        autoBind(this);
    }
    authenticate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            this.logger.info('LoginController - authenticate()');
            if (req.body && req.body.email) {
                const email = req.body.email;
                const password = req.body.password ? req.body.password : '';
                yield this.loginService.getLogin(email)
                    .then(data => {
                    if ('_id' in data) {
                        if (bcrypt.compareSync(password, data.password)) {
                            this.employeeService.getEmployeeById(data._id)
                                .then(employee => {
                                if ('status' in employee && employee.status === 'active') {
                                    // Generate the JWT token
                                    const token = jwt.sign({
                                        id: employee._id,
                                        type: employee.type,
                                        firstName: employee.firstName,
                                        lastName: employee.lastName,
                                    }, config_1.default.secret, { expiresIn: 86400 });
                                    this.sendResponse(res, 200, token, 'Authenticated');
                                }
                                else if ('status' in employee && employee.status === 'inactive') {
                                    this.sendResponse(res, 401, null, 'Account suspended');
                                }
                                else {
                                    this.sendResponse(res, 401, null, 'Account not activated');
                                }
                            })
                                .catch(error => {
                                this.sendResponse(res, 500, null, error.message);
                            });
                        }
                        else {
                            this.sendResponse(res, 401, null, 'Password invalid');
                        }
                    }
                    else {
                        res.status(404).send(data);
                    }
                });
            }
        });
    }
    sendResponse(res, status, token, msg) {
        res.status(status).send({
            token: token,
            msg: msg
        });
    }
}
exports.default = LoginController;
//# sourceMappingURL=LoginController.js.map