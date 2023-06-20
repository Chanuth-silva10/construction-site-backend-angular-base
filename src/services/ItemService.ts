import {IItem} from "../interfaces/IItem";
import {Logger} from "../loaders/logger";
import {IItemService} from "./interfaces/IItemService";
import {ItemDao} from "../dao/ItemDao";
import { CategoryService } from "./CategoryService";

export class ItemService implements IItemService{
    private logger = Logger.getInstance();
    public static instance:ItemService = null;
    private ItemDao = ItemDao.getInstance();
    private categoryService = CategoryService.getInstance();
    public static getInstance():ItemService{
        if(this.instance === null){
            this.instance = new ItemService();
        }
        return this.instance;
    }

    public async addItem(item:IItem):Promise<IItem>{
        this.logger.info("Item Services - createItem()");

        return await this.ItemDao.save(item)
            .then(data=>{
                item.categories.map(category => {
                    this.categoryService.addItemToCategory(category,data._id);
                })
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getAllItems():Promise<IItem[]>{
        this.logger.info("Item Services - getAllItems()");
        return await this.ItemDao.getAll()
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getItemById(id:String):Promise<IItem | Object>{
        this.logger.info("Item Services - getItemById()");
        return await this.ItemDao.getById(id)
            .then(data=>{
                    return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }

    public async editItem(id:String,Item:IItem):Promise<IItem | Object>{
        this.logger.info("Item Services - updateItem()");
        return await this.ItemDao.update(id,Item)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async removeItem(id:String):Promise<IItem | Object>{
        this.logger.info("Item Services - deleteItem()");
        return await this.ItemDao.delete(id)
            .then((data:any)=>{
                data.categories.map(category => {
                    this.categoryService.removeItemFromCategory(category,data._id);
                })
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }

    public async getItemBySupplierId(id:String):Promise<IItem | Object>{
        this.logger.info("Item Services - getItemBySupplierId()");
        return await this.ItemDao.getBySupplierId(id)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
}