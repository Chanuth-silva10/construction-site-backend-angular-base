"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const employeeTypes_1 = require("../enums/employeeTypes");
const Schema = mongoose.Schema;
const RulesSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    limit: {
        type: Number,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    approvals: {
        type: [String],
        enum: [employeeTypes_1.employeeTypes.procurementStaff, employeeTypes_1.employeeTypes.staffSupervisor, employeeTypes_1.employeeTypes.siteManager],
        required: true
    },
    approvalType: {
        type: String,
        enum: ["single", "multiple"],
        required: true
    }
    // items: [{type: Schema.Types.itemId, required: false, ref: 'items'}]
}, { timestamps: true });
exports.default = mongoose.model('rules', RulesSchema);
//# sourceMappingURL=Rules.js.map