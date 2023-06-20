import {IPermission} from "../../interfaces/IPermission";

export interface IPermissionService{
    createPermission(request:IPermission):Promise<IPermission>;
    getAllPermission():Promise<IPermission[]>;
    getPermissionById(id:String):Promise<IPermission | Object>;
    updatePermission(id:String,product:IPermission):Promise<IPermission | Object>;
    deletePermission(id:String):Promise<IPermission | Object>;
}