import {IItem} from "../interfaces/IItem";
import * as mongoose from "mongoose";

const Schema = mongoose.Schema;
const ItemSchema = new Schema(
    {
        itemName:{
            type:String,
            required:true,
            trim:true
        },
        itemCode:{
            type:String,
            required:true,
            trim:true
        },
        defaultUnit:{
            type:String,
            required:true,
            trim:true,
        },
        supplier:[
            {
            supplierId: {
                type: Schema.Types.ObjectId,
                required: true,
                ref: 'supplier'
            },
            qty:{
                type:Number,
                required:true,
                trim:true,
            },
            unitPrice:{
                type:Number,
                required:true,
                trim:true,
            },
            }
        ],
        categories:[
            {
                type:Schema.Types.ObjectId,
                required:false,
                ref:'categories'
            }
            ],
    }
, { timestamps: true });
export default mongoose.model<IItem & mongoose.Document>('items',ItemSchema)