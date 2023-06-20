import {Logger} from "../loaders/logger";
import {ICategory} from "../interfaces/ICategory";
import Category from "../models/Category";

export class CategoryDao{

    private logger = Logger.getInstance();
    public static instance:CategoryDao = null;

    public static getInstance():CategoryDao{
        if(this.instance === null){
            this.instance = new CategoryDao();
        }
        return this.instance;
    }

    public async save(request:ICategory){
        this.logger.info("CategoryDao - save()");
        const category = new Category(request);
        return await category.save()
            .then(data=>{
                this.logger.info(`Category ${data.name} Inserted Successfully`)
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in inserting product" + error.message);
                throw error;
            })
    }
    public async getAll(){
        this.logger.info("CategoryDao - getAll()");
        return await Category.find({})
            .then(data=>{
                if(data.length>0){
                    this.logger.info(`Category Retrieved Successfully`);
                }else{
                    this.logger.info(`Category Not Found`);
                }
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in retrieving categories" + error.message);
                throw error;
            })
    }

    public async getById(id:String){
        this.logger.info("CategoryDao - getById()");
        return await Category.findById(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.name} Category Retrieved Successfully`)
                    return data;
                }else{
                    this.logger.info(`Category ${id} Not Found`)
                    return {msg:"Category Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in retrieving category ${id} ${error.message}`);
                throw error;
            })
    }

    public async update(id:String,category:ICategory){
        this.logger.info("CategoryDao - update()");
        return await Category.findByIdAndUpdate(id,{$set:category},{new:true})
            .then(data=>{
                if(data){
                    this.logger.info(`${data.name} Category Updated Successfully`);
                    return data;
                }else{
                    this.logger.info(`Category ${id} Not Found`);
                    return {msg:"Category Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in updating Category ${id} ${error.message}`);
                throw error;
            })
    }
    public async addItem(id:String,itemId:string){
        this.logger.info("CategoryDao - addItem()");
        return await Category.findByIdAndUpdate(id,{$addToSet:{items:itemId}},{new:true})
            .then(data=>{
                if(data){
                    this.logger.info(`Item added to ${data.name} Category Successfully`);
                    return data;
                }else{
                    this.logger.info(`Category ${id} Not Found`);
                    return {msg:"Category Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in adding item to Category ${id} ${error.message}`);
                throw error;
            })
    }
    public async removeItem(id:String,itemId:string){
        this.logger.info("CategoryDao - removeItem()");
        return await Category.findByIdAndUpdate(id,{$pull:{items:itemId}},{new:true})
            .then(data=>{
                if(data){
                    this.logger.info(`Item removed from ${data.name} Category Successfully`);
                    return data;
                }else{
                    this.logger.info(`Category ${id} Not Found`);
                    return {msg:"Category Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in removing item from Category ${id} ${error.message}`);
                throw error;
            })
    }
    public async delete(id:String){
        this.logger.info("CategoryDao - delete()");
        return await Category.findByIdAndDelete(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.name} Category Deleted Successfully`);
                    return data;
                }else{
                    this.logger.info(`Category ${id} Not Found`);
                    return {msg:"Category Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in deleting Category ${id} ${error.message}`);
                throw error;
            })
    }
}