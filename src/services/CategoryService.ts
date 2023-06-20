import {ICategory} from "../interfaces/ICategory";
import {Logger} from "../loaders/logger";
import {ICategoryService} from "./interfaces/ICategoryService";
import {CategoryDao} from "../dao/CategoryDao";

export class CategoryService implements ICategoryService{
    private logger = Logger.getInstance();
    public static instance:CategoryService = null;
    private CategoryDao = CategoryDao.getInstance();
    public static getInstance():CategoryService{
        if(this.instance === null){
            this.instance = new CategoryService();
        }
        return this.instance;
    }

    public async createCategory(request:ICategory):Promise<ICategory>{
        this.logger.info("Category Services - createCategory()");

        return await this.CategoryDao.save(request)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getAllCategory():Promise<ICategory[]>{
        this.logger.info("Category Services - getAllCategory()");
        return await this.CategoryDao.getAll()
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getCategoryById(id:String):Promise<ICategory | Object>{
        this.logger.info("Category Services - getCategoryById()");
        return await this.CategoryDao.getById(id)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }

    public async updateCategory(id:String,category:ICategory):Promise<ICategory | Object>{
        this.logger.info("Category Services - updateCategory()");
        return await this.CategoryDao.update(id,category)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async addItemToCategory(id:String,itemId:string):Promise<ICategory | Object>{
        this.logger.info("Category Services - addItemToCategory()");
        return await this.CategoryDao.addItem(id,itemId)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }

    public async removeItemFromCategory(id:String,itemId:string):Promise<ICategory | Object>{
        this.logger.info("Category Services - removeItemFromCategory()");
        return await this.CategoryDao.removeItem(id,itemId)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async deleteCategory(id:String):Promise<ICategory | Object>{
        this.logger.info("Category Services - deleteCategory()");
        return await this.CategoryDao.delete(id)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
}