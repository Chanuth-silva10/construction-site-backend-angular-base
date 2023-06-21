"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const { Schema } = mongoose;
const PaymentSchema = new Schema({
    paymentId: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'orders',
        required: true
    },
    payedAmount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose.model('payments', PaymentSchema);
//# sourceMappingURL=Payment.js.map