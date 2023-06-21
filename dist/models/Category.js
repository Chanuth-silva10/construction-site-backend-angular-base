"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    items: [{ type: Schema.Types.ObjectId, required: false, ref: 'items' }]
}, { timestamps: true });
exports.default = mongoose.model('category', CategorySchema);
//# sourceMappingURL=Category.js.map