"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const User_1 = require("./User");
const employeeTypes_1 = require("../enums/employeeTypes");
const { Schema } = mongoose;
const Employee = User_1.default.discriminator('employees', new Schema({
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
        enum: [employeeTypes_1.employeeTypes.procurementStaff, employeeTypes_1.employeeTypes.staffSupervisor, employeeTypes_1.employeeTypes.siteManager],
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
exports.default = mongoose.model('employees');
//# sourceMappingURL=Employee.js.map