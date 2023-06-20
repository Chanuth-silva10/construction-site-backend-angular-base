import { IEmployee } from '../interfaces/IEmployee';
import * as mongoose from 'mongoose';
import User from './User';
import {employeeTypes} from "../enums/employeeTypes";

const { Schema } = mongoose;

const Employee = User.discriminator('employees', new Schema({
    empId: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: false,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        required: true,
        default: 'active',
    },
    type: {
        type: String,
        enum: [employeeTypes.procurementStaff, employeeTypes.staffSupervisor, employeeTypes.siteManager],
        required: true
    },
    permissions: [{
        type: Number,
        required: false,
    }],
    avatar: {
        type: String,
        required: false
    }
}));

export default mongoose.model<IEmployee & mongoose.Document>('employees');
