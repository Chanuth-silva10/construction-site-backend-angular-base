"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PermissionSchema = new Schema({
    permissionId: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true,
    }
}, { timestamps: true });
exports.default = mongoose.model('permission', PermissionSchema);
//# sourceMappingURL=Permission.js.map