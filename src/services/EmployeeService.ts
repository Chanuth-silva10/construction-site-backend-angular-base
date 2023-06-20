import { IEmployee } from '../interfaces/IEmployee';
import { Logger } from '../loaders/logger';
import { IEmployeeService } from './interfaces/IEmployeeService';
import { EmployeeDao } from '../dao/EmployeeDao';

export class EmployeeService implements IEmployeeService {
    private logger = Logger.getInstance();
    public static instance: EmployeeService = null;
    private employeeDao = EmployeeDao.getInstance();

    public static getInstance(): EmployeeService {
        if (this.instance === null) {
            this.instance = new EmployeeService();
        }

        return this.instance;
    }

    public async addEmployee(request: IEmployee): Promise<IEmployee> {
        this.logger.info('EmployeeService - addEmployee()');

        return await this.employeeDao.save(request)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async viewEmployees(): Promise<IEmployee[]> {
        this.logger.info('EmployeeService - viewEmployees()');

        return await this.employeeDao.getAll()
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async getEmployeeById(id: String): Promise<IEmployee | Object> {
        this.logger.info('EmployeeService - getEmployeeById()');

        return await this.employeeDao.getById(id)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async getEmployeeByType(type: string): Promise<IEmployee[] | Object> {
        this.logger.info('EmployeeService - getEmployeeByType()');

        return await this.employeeDao.getByType(type)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async editEmployee(id: String, employee: IEmployee): Promise<IEmployee | Object> {
        this.logger.info('EmployeeService - editEmployee()');

        return await this.employeeDao.update(id, employee)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async updateEmployeeStatus(id:string,status:string):Promise<IEmployee | Object>{
        this.logger.info("Employee Services - updateEmployeeStatus()");
        return await this.employeeDao.updateStatus(id,status)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }

    public async deleteEmployee(id: String): Promise<IEmployee | Object> {
        this.logger.info('EmployeeService - deleteEmployee()');

        return await this.employeeDao.delete(id)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }
}
