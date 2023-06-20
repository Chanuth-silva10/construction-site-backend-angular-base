import {ISupplier} from "../interfaces/ISupplier";
import {Logger} from "../loaders/logger";
import {ISupplierService} from "./interfaces/ISupplierService";
import {SupplierDao} from "../dao/SupplierDao";

export class SupplierService implements ISupplierService{
    private logger = Logger.getInstance();
    public static instance:SupplierService = null;
    private SupplierDao = SupplierDao.getInstance();
    public static getInstance():SupplierService{
        if(this.instance === null){
            this.instance = new SupplierService();
        }
        return this.instance;
    }

    public async createSupplier(request:ISupplier):Promise<ISupplier>{
        this.logger.info("Supplier Services - createSupplier()");

        return await this.SupplierDao.save(request)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getAllSupplier():Promise<ISupplier[]>{
        this.logger.info("Supplier Services - getAllSupplier()");
        return await this.SupplierDao.getAll()
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getSupplierById(id:String):Promise<ISupplier | Object>{
        this.logger.info("Supplier Services - getSupplierById()");
        return await this.SupplierDao.getById(id)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }

    public async updateSupplier(id:String,supplier:ISupplier):Promise<ISupplier | Object>{
        this.logger.info("Supplier Services - updateSupplier()");
        return await this.SupplierDao.update(id,supplier)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async deleteSupplier(id:String):Promise<ISupplier | Object>{
        this.logger.info("Supplier Services - deleteSupplier()");
        return await this.SupplierDao.delete(id)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
}