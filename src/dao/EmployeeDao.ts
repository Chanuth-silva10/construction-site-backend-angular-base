import { Logger } from '../loaders/logger';
import { IEmployee } from '../interfaces/IEmployee';
import Employee from '../models/Employee';

export class EmployeeDao {
    private logger = Logger.getInstance();
    public static instance: EmployeeDao = null;

    public static getInstance(): EmployeeDao {
        if (this.instance === null) {
            this.instance = new EmployeeDao();
        }

        return this.instance;
    }

    public async save(request: IEmployee) {
        this.logger.info('EmployeeDao - save()');
        const employee = new Employee(request);

        // Increment employee ID
        let latestEmployee = await Employee.find().sort({ payDate: -1 }).limit(1);
        
        if (latestEmployee.length > 0){
            employee.empId = latestEmployee[0].empId + 1;
        } else {
            employee.empId = 1000;
        }

        return await employee.save()
            .then(data => {
                this.logger.info(`Employee ${data._id} Inserted Successfully`);
                return data;
            })
            .catch(error => {
                this.logger.error('Error in inserting employee' + error.message);
                throw error;
            });
    }

    public async getAll() {
        this.logger.info('EmployeeDao - getAll()');

        return await Employee.find({})
            .then(data => {
                if (data.length > 0) {
                    this.logger.info('Employees Retrieved Successfully');
                } else {
                    this.logger.error('Employees Not Found');
                }

                return data;
            })
            .catch(error => {
                this.logger.error('Error in retrieving employees' + error.message);
                throw error;
            });
    }

    public async getById(id: String) {
        this.logger.info('EmployeeDao - getById()');

        return await Employee.findById(id)
            .then(data => {
                if (data) {
                    this.logger.info(`${id} Employee Retrieved Successfully`);
                    return data;
                } else {
                    this.logger.info(`Employee ${id} Not Found`);
                    return { msg: 'Employee Not Found' };
                }
            })
            .catch(error => {
                this.logger.error(`Error in retrieving employee ${id} ${error.message}`);
                throw error;
            });
    }

    public async update(id: String, employee: IEmployee) {
        this.logger.info('EmployeeDao - update()');

        return await Employee.findByIdAndUpdate(id, {$set: employee}, {new: true})
            .then(data => {
                if (data) {
                    this.logger.info(`${id} Employee Updated Successfully`);
                    return data;
                } else {
                    this.logger.info(`Employee ${id} Not Found`);
                    return { msg: 'Employee Not Found' };
                }
            })
            .catch(error => {
                this.logger.error(`Error in updating employee ${id} ${error.message}`);
                throw error;
            });
    }

    public async updateStatus(id:string,status:string){
        this.logger.info("EmployeeDao - updateStatus()");
        return await Employee.findByIdAndUpdate(id,{$set:{status:status}},{new:true})
            .then(data=>{
                if(data){
                    this.logger.info(`${data.firstName} ${data.lastName} Employee Status Updated Successfully to ${status}`);
                    return data;
                }else{
                    this.logger.info(`Employee ${id} Not Found`);
                    return {msg:"Employee Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in updating employee ${id} ${error.message}`);
                throw error;
            })
    }

    public async delete(id: String) {
        this.logger.info('EmployeeDao - delete()');

        return await Employee.findByIdAndDelete(id)
            .then(data => {
                if (data) {
                    this.logger.info(`${id} Employee Deleted Successfully`);
                    return data;
                } else {
                    this.logger.info(`Employee ${id} Not Found`);
                    return {msg: 'Employee Not Found'};
                }
            })
            .catch(error => {
                this.logger.error(`Error in deleting employee ${id} ${error.message}`);
                throw error;
            })
    }
    public async getByType(type: string) {
        this.logger.info('EmployeeDao - getByType()');

        return await Employee.find({"type":{$regex:type,$options:"i"}})
            .then(data => {
                if (data) {
                    this.logger.info(`${type} Employee Retrieved Successfully`);
                    return data;
                } else {
                    this.logger.info(`Employees of ${type} type Not Found`);
                    return { msg: `${type} Employees not found` };
                }
            })
            .catch(error => {
                this.logger.error(`Error in retrieving employee of type ${type} ${error.message}`);
                throw error;
            });
    }
}
