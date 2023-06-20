import {ICategory} from "../interfaces/ICategory";
import * as mongoose from "mongoose";
const Schema = mongoose.Schema;
const CategorySchema = new Schema(
    {
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
        items: [{type: Schema.Types.ObjectId, required: false, ref: 'items'}]
    }
    , { timestamps: true });
export default mongoose.model<ICategory & mongoose.Document>('category',CategorySchema)