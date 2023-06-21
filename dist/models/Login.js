"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const { Schema } = mongoose;
const LoginSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    }
});
LoginSchema.index({ email: 1, type: 1 }, { unique: true });
exports.default = mongoose.model('logins', LoginSchema);
//# sourceMappingURL=Login.js.map