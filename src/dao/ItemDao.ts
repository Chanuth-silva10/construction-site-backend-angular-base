import {Logger} from "../loaders/logger";
import {IItem} from "../interfaces/IItem";
import Item from "../models/Item";
import * as Mongoose from "mongoose";

export class ItemDao{

    private logger = Logger.getInstance();
    public static instance:ItemDao = null;

    public static getInstance():ItemDao{
        if(this.instance === null){
            this.instance = new ItemDao();
        }
        return this.instance;
    }

    public async save(request:IItem){
        this.logger.info("ItemDao - add()");
        const item = new Item(request);
        return await item.save()
            .then(data=>{
                this.logger.info(`Item ${data.itemName} Inserted Successfully`)
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in inserting Item" + error.message);
                throw error;
            })
    }
    public async getAll(){
        this.logger.info("ItemDao - getAll()");
        return await Item.find({}).populate("supplier.supplierId")
            .then(data=>{
                if(data.length>0){
                    this.logger.info(`Items Retrieved Successfully`);
                }else{
                    this.logger.info(`Items Not Found`);
                }
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in retrieving Items" + error.message);
                throw error;
            })
    }

    public async getById(id:String){
        this.logger.info("ItemDao - getById()");
        return await Item.findById(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.itemName} Item Retrieved Successfully`)
                    return data;
                }else{
                    this.logger.info(`Item ${id} Not Found`)
                    return {msg:"Item Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in retrieving Item ${id} ${error.message}`);
                throw error;
            })
    }
    public async getBySupplierId(id:String){
        this.logger.info("ItemDao - getBySupplierId()");
        return await Item.find({"supplier.supplierId":id})
            .then(data=>{
                if(data){
                    this.logger.info(`Items Retrieved Successfully`)
                    return data;
                }else{
                    this.logger.info(`Item ${id} Not Found`)
                    return {msg:"Item Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in retrieving Item ${id} ${error.message}`);
                throw error;
            })
    }

    public async update(id:String,item:IItem){
        this.logger.info("ItemDao - update()");
        return await Item.findByIdAndUpdate(id,{$set:item},{new:true})
            .then(data=>{
                if(data){
                    this.logger.info(`${data.itemName} Items Retrieved Successfully by Seller`);
                    return data;
                }else{
                    this.logger.info(`Seller ${id} Not Found`);
                    return {msg:"Item Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in updating Item ${id} ${error.message}`);
                throw error;
            })
    }

    public async delete(id:String){
        this.logger.info("ItemDao - delete()");
        return await Item.findByIdAndDelete(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.itemName} Item Deleted Successfully`);
                    return data;
                }else{
                    this.logger.info(`Item ${id} Not Found`);
                    return {msg:"Item Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in deleting Item ${id} ${error.message}`);
                throw error;
            })
    }
}