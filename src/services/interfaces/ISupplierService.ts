import {ISupplier} from "../../interfaces/ISupplier";

export interface ISupplierService{
    createSupplier(request:ISupplier):Promise<ISupplier>;
    getAllSupplier():Promise<ISupplier[]>;
    getSupplierById(id:String):Promise<ISupplier | Object>;
    updateSupplier(id:String,product:ISupplier):Promise<ISupplier | Object>;
    deleteSupplier(id:String):Promise<ISupplier | Object>;
}