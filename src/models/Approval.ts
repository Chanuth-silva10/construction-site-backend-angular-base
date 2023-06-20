import {IApproval} from "../interfaces/IApproval";
import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const ApprovalSchema = new Schema({

    order: {
        type: Schema.Types.ObjectId,
        ref: 'order',
        required: true
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'item',
        required: true
    },
    qty:{
        type:Number,
        required:true
    },
    approvals: [{
        type: Schema.Types.ObjectId,
        ref: 'employee',
        required: true
    }],
   

}, { timestamps: true });

export default mongoose.model<IApproval & mongoose.Document>('approvals', ApprovalSchema);
