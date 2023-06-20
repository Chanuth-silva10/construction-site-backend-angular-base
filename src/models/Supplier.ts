import {ISupplier} from "../interfaces/ISupplier";
import * as mongoose from "mongoose";
import {ICategory} from "../interfaces/ICategory";
import Supplier from "./Supplier";

const Schema = mongoose.Schema;
const SupplierSchema = new Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        address:{
            type:String,
            required:true,
            trim:true
        },
        contact:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            trim:true
        },
        storeName:{
            type:String,
            required:true,
            trim:true
        }
    },
    {timestamps: true});
export default mongoose.model<ISupplier & mongoose.Document>('supplier',SupplierSchema)

