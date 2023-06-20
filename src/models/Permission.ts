import {IPermission} from "../interfaces/IPermission";
import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
const PermissionSchema = new Schema(
    {
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
    }
    , { timestamps: true });
export default mongoose.model<IPermission & mongoose.Document>('permission',PermissionSchema)