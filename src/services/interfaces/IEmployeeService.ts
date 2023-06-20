import { IEmployee } from '../../interfaces/IEmployee';

export interface IEmployeeService {
    addEmployee(request: IEmployee): Promise<IEmployee>;
    viewEmployees(): Promise<IEmployee[]>;
    getEmployeeById(id: String): Promise<IEmployee | Object>;
    getEmployeeByType(type: string): Promise<IEmployee[] | Object>;
    editEmployee(id: String, employee: IEmployee): Promise<IEmployee | Object>;
    updateEmployeeStatus(id: string, status: string): Promise<IEmployee | Object>;
    deleteEmployee(id: String): Promise<IEmployee | Object>;
}
