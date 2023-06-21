"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const { Schema } = mongoose;
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true
    }
}, { discriminatorKey: 'userType' });
exports.default = mongoose.model('users', UserSchema);
//# sourceMappingURL=User.js.map