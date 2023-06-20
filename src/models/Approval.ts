import {IApproval} from "../interfaces/IApproval";
import * as mongoose from 'mongoose';
import {OrderStatus} from "../enums/orderStatus";

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
    status: {
        type: String,
        enum: [OrderStatus.approved,OrderStatus.declined,OrderStatus.partiallyApproved,OrderStatus.pending,OrderStatus.placed,OrderStatus.referred,OrderStatus.returned,OrderStatus.waiting],
        default: OrderStatus.pending
    }

}, { timestamps: true });

export default mongoose.model<IApproval & mongoose.Document>('approvals', ApprovalSchema);
