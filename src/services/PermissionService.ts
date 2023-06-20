import {IPermission} from "../interfaces/IPermission";
import {Logger} from "../loaders/logger";
import {IPermissionService} from "./interfaces/IPermissionService";
import {PermissionDao} from "../dao/PermissionDao";

export class PermissionService implements IPermissionService{
    private logger = Logger.getInstance();
    public static instance:PermissionService = null;
    private PermissionDao = PermissionDao.getInstance();
    public static getInstance():PermissionService{
        if(this.instance === null){
            this.instance = new PermissionService();
        }
        return this.instance;
    }

    public async createPermission(request:IPermission):Promise<IPermission>{
        this.logger.info("Permission Services - createPermission()");

        return await this.PermissionDao.save(request)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getAllPermission():Promise<IPermission[]>{
        this.logger.info("Permission Services - getAllPermission()");
        return await this.PermissionDao.getAll()
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getPermissionById(id:String):Promise<IPermission | Object>{
        this.logger.info("Permission Services - getPermissionById()");
        return await this.PermissionDao.getById(id)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }

    public async updatePermission(id:String,category:IPermission):Promise<IPermission | Object>{
        this.logger.info("Customer Services - updateCustomer()");
        return await this.PermissionDao.update(id,category)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async deletePermission(id:String):Promise<IPermission | Object>{
        this.logger.info("Permission Services - deletePermission()");
        return await this.PermissionDao.delete(id)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
}