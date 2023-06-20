import {IItem} from "../../interfaces/IItem";

export interface IItemService{
    addItem(request:IItem):Promise<IItem>;
    getAllItems():Promise<IItem[]>;
    getItemById(id:String):Promise<IItem | Object>;
    editItem(id:String,Item:IItem):Promise<IItem | Object>;
    removeItem(id:String):Promise<IItem | Object>;
    getItemBySupplierId(id:String):Promise<IItem[] | Object>;
}