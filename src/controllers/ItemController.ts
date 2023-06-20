import {Logger} from "../loaders/logger";
import {ItemService} from "../services/ItemService";
import {IItem} from "../interfaces/IItem";
import {IItemService} from "../services/interfaces/IItemService";
import * as fs from "fs";
import mime = require("mime");
const autoBind = require('auto-bind');


export default class ItemController{

    private logger:Logger;
    private ItemService:IItemService;

    constructor(){
        this.logger = Logger.getInstance();
        this.ItemService = ItemService.getInstance();
        autoBind(this);
    }



    public async addItem(req:any,res:any){
        this.logger.info("ItemController - addItem()");

        if(req.body){
            await this.ItemService.addItem(req.body)
                .then(data => {
                    res.status(200).send(data);
                })
                .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({err:error.message});
                })
        }
    }
    public async getAllItems(req:any,res:any) {
        this.logger.info("ItemController - getAllItems()");

        await this.ItemService.getAllItems()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
    public async getItemById(req:any,res:any) {
        this.logger.info("ItemController - getItemById()");
        const id = req.params.id;
        await this.ItemService.getItemById(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

    public async getItemsBySupplierId(req:any,res:any) {
        this.logger.info("ItemController - getItemsBySupplierId()");
        const id = req.params.id;
        await this.ItemService.getItemBySupplierId(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

    public async editItem(req:any,res:any) {
        this.logger.info("ItemController - editItem()");

        const id = req.params.id;
        const Item:IItem = req.body;
        await this.ItemService.editItem(id , Item)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

    public async removeItem(req:any,res:any) {
        this.logger.info("ItemController - removeItem()");
        const id = req.params.id;
        await this.ItemService.removeItem(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

}
