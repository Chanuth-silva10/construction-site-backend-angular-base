import {Logger} from "../loaders/logger";
import {EmployeeService} from "../services/EmployeeService";
import {IEmployee} from "../interfaces/IEmployee";
import {IEmployeeService} from "../services/interfaces/IEmployeeService";
import { ILogin } from '../interfaces/ILogin';
import { ILoginService } from '../services/interfaces/ILoginService';
import { LoginService } from '../services/LoginService';
import * as mime from 'mime';
import * as fs from 'fs';
const autoBind = require('auto-bind');
const bcrypt = require('bcrypt');

export default class EmployeeController {

    private logger:Logger;
    private employeeService:IEmployeeService;
    private loginService: ILoginService;

    constructor(){
        this.logger = Logger.getInstance();
        this.employeeService = EmployeeService.getInstance();
        this.loginService = LoginService.getInstance();
        autoBind(this);
    }

    public async addEmployee(req:any, res:any){
        this.logger.info("EmployeeController - addEmployee()");

        let employee: IEmployee;
        let login: ILogin;

        if (req.body) {
            employee = req.body;
            login = req.body;
        }

        if (employee) {
            await this.employeeService.addEmployee(employee)
                .then(async data => {
                    if (data._id) {
                        // Set employee ID as corresponding login ID
                        login._id = data._id.toString();
                        // Encrypt password
                        login.password = bcrypt.hashSync(login.password, 8);

                        await this.loginService.createLogin(login)
                            .then(() => {
                                res.status(200).send(data);
                            })
                            .catch(error => {
                                this.logger.error(error.message);
                                res.status(500).send({ err: error.message });
                            });
                    }
                })
                .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({ err: error.message });
                });
        }
    }

    public async viewEmployees(req:any, res:any) {
        this.logger.info("EmployeeController - viewEmployees()");

        await this.employeeService.viewEmployees()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }

    public async getEmployeeById(req:any, res:any) {
        this.logger.info("EmployeeController - getEmployeeById()");
        const id = req.params.id;
        await this.employeeService.getEmployeeById(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }

    public async getEmployeeByType(req:any, res:any) {
        this.logger.info("EmployeeController - getEmployeeByType()");
        const type = req.params.type;
        await this.employeeService.getEmployeeByType(type)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }

    public async editEmployee(req:any, res:any) {
        this.logger.info("EmployeeController - editEmployee()");

        let employee: IEmployee;
        let login: ILogin;

        const id = req.params.id;
        
        if (req.body) {
            employee = JSON.parse(req.body.data);
            login = JSON.parse(req.body.data);
        }

        if (employee) {
            if (req.file)
                employee.avatar = req.file.filename;

            await this.employeeService.editEmployee(id, employee)
                .then(async data => {
                    if ('_id' in data) {
                        // Encrypt password
                        if (login.password) {
                            login.password = bcrypt.hashSync(login.password, 8);
                        }

                        await this.loginService.updateLogin(id, login)
                            .then(() => {
                                res.status(200).send(data);
                            })
                            .catch(error => {
                                this.logger.error(error.message);
                                res.status(500).send({ err: error.message });
                            });
                    } else {
                        res.status(404).send(data);
                    }
                })
                .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({ err:error.message });
                });
        }
    }

    public async updateEmployeeStatus(req: any, res: any) {
        this.logger.info('EmployeeController - updateEmployeeStatus()');
        const id = req.body.id;
        const status = req.body.status;
        await this.employeeService.updateEmployeeStatus(id,status)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }

    public async updateEmployeePassword(req: any, res: any) {
        this.logger.info('EmployeeController - updateEmployeePassword()');
        
        if (req.body) {
            const id = req.params.id;
            const email = req.body.email;
            const currentPassword = req.body.currentPassword;
            const newPassword = req.body.newPassword;

            await this.loginService.getLogin(email)
                .then(data => {
                    if ('_id' in data) {
                        if (bcrypt.compareSync(currentPassword, data.password)) {
                            const login = {
                                email: email,
                                password: bcrypt.hashSync(newPassword, 8)
                            }

                            this.loginService.updateLogin(id, login)
                                .then(() => {
                                    res.status(200).send(data);
                                })
                                .catch(error => {
                                    this.logger.error(error.message);
                                    res.status(500).send({ err: error.message });
                                });
                        } else {
                            res.status(401).send({ msg: 'Password invalid' });
                        }
                    } else {
                        res.status(404).send(data);
                    }
                })
                .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({ err: error.message });
                })
        }
    }

    public async deleteEmployee(req:any, res:any) {
        this.logger.info("EmployeeController - deleteEmployee()");
        
        const id = req.params.id;

        await this.loginService.deleteLogin(id).then(data => {
            this.employeeService.deleteEmployee(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
        });
    }

    public async getEmployeeAvatar(req: any, res: any) {
        this.logger.info('EmployeeController - getEmployeeAvatar()');

        // Define filename and path
        const filename = req.params.name;
        const path = `./public/uploads/images/employee/${filename}`;
        
        // Create a mime-type and set it as the content type in the response header
        const mimeType = mime.lookup(path);
        res.contentType(mimeType)

        // Open the file as a readable stream and pipe it to the response object
        let readStream = fs.createReadStream(path);
        readStream.on('open', () => {
            readStream.pipe(res);
        });

        // Catch errors if they occur
        readStream.on('error', err => {
            Logger.getInstance().error(`Image ${filename} not found`);
            res.status(404).send(err);
        })
    }
}
