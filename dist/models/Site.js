"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SiteSchema = new Schema({
    siteId: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    siteName: {
        type: String,
        required: true,
        trim: true
    },
    siteAddress: {
        type: String,
        required: true,
        trim: true
    },
    manager: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    contact: {
        type: String,
        required: false,
        trim: true,
    },
}, { timestamps: true });
exports.default = mongoose.model('site', SiteSchema);
//# sourceMappingURL=Site.js.map