"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const orderStatus_1 = require("../enums/orderStatus");
const employeeTypes_1 = require("../enums/employeeTypes");
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
    deliveryAddress: {
        type: String,
        required: true,
        trim: true
    },
    total: {
        type: Number,
        required: true
    },
    expectedDeliveryDate: {
        type: Date,
        required: true,
        trim: true
    },
    items: [
        {
            itemId: {
                type: Schema.Types.ObjectId,
                ref: 'items',
                required: true
            },
            qty: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
                required: true
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
        enum: [orderStatus_1.OrderStatus.approved, orderStatus_1.OrderStatus.declined, orderStatus_1.OrderStatus.partiallyApproved, orderStatus_1.OrderStatus.pending, orderStatus_1.OrderStatus.placed, orderStatus_1.OrderStatus.referred, orderStatus_1.OrderStatus.returned, orderStatus_1.OrderStatus.waiting, orderStatus_1.OrderStatus.partiallyDelivered, orderStatus_1.OrderStatus.delivered],
        default: orderStatus_1.OrderStatus.pending
    },
    comments: [{
            type: Object
        }],
    orderNotes: {
        type: String,
        required: false,
        trim: true
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    approvals: [
        {
            approvedBy: {
                type: Schema.Types.ObjectId,
                ref: 'users',
                required: false,
            },
            empType: {
                type: [String],
                enum: [employeeTypes_1.employeeTypes.procurementStaff, employeeTypes_1.employeeTypes.staffSupervisor, employeeTypes_1.employeeTypes.siteManager],
                required: false
            },
            status: {
                type: String,
                enum: [orderStatus_1.OrderStatus.pending, orderStatus_1.OrderStatus.approved, orderStatus_1.OrderStatus.declined],
                required: false
            }
        }
    ],
}, { timestamps: true });
exports.default = mongoose.model('orders', OrderSchema);
//# sourceMappingURL=Order.js.map