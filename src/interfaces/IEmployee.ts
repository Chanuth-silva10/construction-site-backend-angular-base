import { IUser } from './IUser';

export interface IEmployee extends IUser {
    _id?: string;
    empId: number;
    firstName: string;
    lastName: string;
    department: string;
    email: string;
    phone: string;
    status: string;
    type: string;
    permissions: [];
    avatar: string;
}