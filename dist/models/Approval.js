"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const orderStatus_1 = require("../enums/orderStatus");
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
    qty: {
        type: Number,
        required: true
    },
    approvals: [{
            type: Schema.Types.ObjectId,
            ref: 'employee',
            required: true
        }],
    status: {
        type: String,
        enum: [orderStatus_1.OrderStatus.approved, orderStatus_1.OrderStatus.declined, orderStatus_1.OrderStatus.partiallyApproved, orderStatus_1.OrderStatus.pending, orderStatus_1.OrderStatus.placed, orderStatus_1.OrderStatus.referred, orderStatus_1.OrderStatus.returned, orderStatus_1.OrderStatus.waiting],
        default: orderStatus_1.OrderStatus.pending
    }
}, { timestamps: true });
exports.default = mongoose.model('approvals', ApprovalSchema);
//# sourceMappingURL=Approval.js.map