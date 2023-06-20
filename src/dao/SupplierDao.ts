import {Logger} from "../loaders/logger";
import {ISupplier} from "../interfaces/ISupplier";
import Supplier from "../models/Supplier";

export class SupplierDao{

    private logger = Logger.getInstance();
    public static instance:SupplierDao = null;

    public static getInstance():SupplierDao{
        if(this.instance === null){
            this.instance = new SupplierDao();
        }
        return this.instance;
    }

    public async save(request:ISupplier){
        this.logger.info("SupplierDao - save()");
        const category = new Supplier(request);
        return await category.save()
            .then(data=>{
                this.logger.info(`Supplier ${data.name} Inserted Successfully`)
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in inserting product" + error.message);
                throw error;
            })
    }
    public async getAll(){
        this.logger.info("SupplierDao - getAll()");
        return await Supplier.find({})
            .then(data=>{
                if(data.length>0){
                    this.logger.info(`Supplier Retrieved Successfully`);
                }else{
                    this.logger.info(`Supplier Not Found`);
                }
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in retrieving categories" + error.message);
                throw error;
            })
    }

    public async getById(id:String){
        this.logger.info("SupplierDao - getById()");
        return await Supplier.findById(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.name} Supplier Retrieved Successfully`)
                    return data;
                }else{
                    this.logger.info(`Supplier ${id} Not Found`)
                    return {msg:"Supplier Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in retrieving category ${id} ${error.message}`);
                throw error;
            })
    }

    public async update(id:String,category:ISupplier){
        this.logger.info("SupplierDao - update()");
        return await Supplier.findByIdAndUpdate(id,{$set:category},{new:true})
            .then(data=>{
                if(data){
                    this.logger.info(`${data.name} Supplier Updated Successfully`);
                    return data;
                }else{
                    this.logger.info(`Supplier ${id} Not Found`);
                    return {msg:"Supplier Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in updating Supplier ${id} ${error.message}`);
                throw error;
            })
    }

    public async delete(id:String){
        this.logger.info("SupplierDao - delete()");
        return await Supplier.findByIdAndDelete(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.name} Supplier Deleted Successfully`);
                    return data;
                }else{
                    this.logger.info(`Supplier ${id} Not Found`);
                    return {msg:"Supplier Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in deleting Supplier ${id} ${error.message}`);
                throw error;
            })
    }
}