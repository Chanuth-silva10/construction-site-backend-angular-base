import config from '../config/config';
import { Logger } from '../loaders/logger';
import { ILoginService } from '../services/interfaces/ILoginService';
import { LoginService } from '../services/LoginService';
import { IEmployeeService } from '../services/interfaces/IEmployeeService';
import { EmployeeService } from '../services/EmployeeService';
import * as autoBind from 'auto-bind';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

export default class LoginController {
    private logger: Logger;
    private loginService: ILoginService;
    private employeeService: IEmployeeService;

    constructor() {
        this.logger = Logger.getInstance();
        this.loginService = LoginService.getInstance();
        this.employeeService = EmployeeService.getInstance();
        autoBind(this);
    }

    public async authenticate(req: any, res:any) {
        this.logger.info('LoginController - authenticate()');

        if (req.body && req.body.email) {
            const email = req.body.email;
            const password = req.body.password ? req.body.password : '';

            await this.loginService.getLogin(email)
                .then(data => {
                    if ('_id' in data) {
                        if (bcrypt.compareSync(password, data.password)) {
                            this.employeeService.getEmployeeById(data._id)
                                .then(employee => {
                                    if ('status' in employee && employee.status === 'active') {
                                        // Generate the JWT token
                                        const token = jwt.sign(
                                            { 
                                                id: employee._id,
                                                type: employee.type,
                                                firstName: employee.firstName,
                                                lastName: employee.lastName,
                                            },
                                            config.secret,
                                            { expiresIn: 86400 }
                                        );

                                        this.sendResponse(res, 200, token, 'Authenticated');
                                    } else if ('status' in employee && employee.status === 'inactive' ) {
                                        this.sendResponse(res, 401, null, 'Account suspended');
                                    } else {
                                        this.sendResponse(res, 401, null, 'Account not activated');
                                    }
                                })
                                .catch(error => {
                                    this.sendResponse(res, 500, null, error.message);
                                });
                        } else {
                            this.sendResponse(res, 401, null, 'Password invalid');
                        }
                    } else {
                        res.status(404).send(data);
                    }
                });
            
        }
    }

    private sendResponse(res: any, status: Number, token: any, msg: String) {
        res.status(status).send({
            token: token,
            msg: msg
        });
    }
}
