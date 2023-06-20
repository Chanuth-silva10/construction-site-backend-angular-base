import {IOrder} from '../interfaces/IOrder';
import * as mongoose from 'mongoose';
import {OrderStatus} from "../enums/orderStatus";
import {employeeTypes} from "../enums/employeeTypes";


const { Schema } = mongoose;

const OrderSchema = new Schema({
    orderReferenceNo: {
        type: Number,
        unique: true
    },
    site: {
        type: Schema.Types.ObjectId,
        ref: 'site',
        required: true
    },
    supplier: {
        type: Schema.Types.ObjectId,
        ref: 'supplier',
        required: true
    },
    deliveryAddress:{
        type:String,
        required:true,
        trim:true
    },
    total:{
        type:Number,
        required:true
    },
    expectedDeliveryDate:{
        type:Date,
        required:true,
        trim:true
    },
    items: [
        {
            itemId:{
                type: Schema.Types.ObjectId,
                ref: 'items',
                required: true
            },
            qty:{
                type:Number,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            delivered: {
                type: Number,
                required: false,
                default: 0
            }
        }

    ],
    status: {
        type: String,
        enum: [OrderStatus.approved,OrderStatus.declined,OrderStatus.partiallyApproved,OrderStatus.pending,OrderStatus.placed,OrderStatus.referred,OrderStatus.returned,OrderStatus.waiting,OrderStatus.partiallyDelivered,OrderStatus.delivered],
        default: OrderStatus.pending
    },
    comments: [{
        type: Object
    }],
    orderNotes:{
        type:String,
        required:false,
        trim:true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    approvals: [
        {
            approvedBy:{
                type: Schema.Types.ObjectId,
                ref: 'users',
                required: false,
            },
            empType:{
                type: [String],
                enum: [employeeTypes.procurementStaff, employeeTypes.staffSupervisor, employeeTypes.siteManager],
                required: false
            },
            status:{
                type: String,
                enum: [OrderStatus.pending, OrderStatus.approved, OrderStatus.declined],
                required: false
            }
        }
    ],
}, { timestamps: true });

export default mongoose.model<IOrder & mongoose.Document>('orders', OrderSchema);
