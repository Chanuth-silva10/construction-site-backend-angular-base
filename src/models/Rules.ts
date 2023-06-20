import {IRules} from "../interfaces/IRules";
import * as mongoose from "mongoose";
import {employeeTypes} from "../enums/employeeTypes";
const Schema = mongoose.Schema;
const RulesSchema = new Schema(
    {

        name: {
            type: String,
            required: true,
            trim: true
        },
        limit:{
            type:Number,
            required:true,
            trim:true,
        },
        description: {
            type: String,
            required: false,
            trim: true,
        },
        approvals: {
            type: [String],
            enum: [employeeTypes.procurementStaff, employeeTypes.staffSupervisor, employeeTypes.siteManager],
            required: true
        },
        approvalType:{
            type: String,
            enum: ["single","multiple"],
            required: true
        }

        // items: [{type: Schema.Types.itemId, required: false, ref: 'items'}]
    }
    , { timestamps: true });
export default mongoose.model<IRules & mongoose.Document>('rules',RulesSchema)

