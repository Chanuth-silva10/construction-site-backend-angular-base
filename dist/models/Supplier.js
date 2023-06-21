"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SupplierSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    storeName: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });
exports.default = mongoose.model('supplier', SupplierSchema);
//# sourceMappingURL=Supplier.js.map