"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const { Schema } = mongoose;
const DeliverySchema = new Schema({
    deliveryId: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'orders',
        required: true
    },
    supplierId: {
        type: Schema.Types.ObjectId,
        ref: 'supplier',
        required: true
    },
    items: {
        type: Array,
        required: true,
    },
    comment: {
        type: String,
        trim: true,
        required: false
    }
}, { timestamps: true });
exports.default = mongoose.model('deliveries', DeliverySchema);
//# sourceMappingURL=Delivery.js.map