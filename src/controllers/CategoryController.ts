import {Logger} from "../loaders/logger";
import {CategoryService} from "../services/CategoryService";
import {ICategory} from "../interfaces/ICategory";
import {ICategoryService} from "../services/interfaces/ICategoryService";
const autoBind = require('auto-bind');
export default class CategoryController{

    private logger:Logger;
    private categoryService:ICategoryService;

    constructor(){
        this.logger = Logger.getInstance();
        this.categoryService = CategoryService.getInstance();
        autoBind(this);
    }

    public async createCategory(req:any,res:any){
        this.logger.info("CategoryController - createCategory()");

        if(req.body){
            await this.categoryService.createCategory(req.body)
                .then(data => {
                    res.status(200).send(data);
                })

                .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({err:error.message});
                })
        }
    }
    public async getAllCategory(req:any,res:any) {
        this.logger.info("CategoryController - getAllCategory()");

        await this.categoryService.getAllCategory()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
    public async getCategoryById(req:any,res:any) {
        this.logger.info("CategoryController - getCategoryById()");
        const id = req.params.id;
        await this.categoryService.getCategoryById(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

    public async updateCategory(req:any,res:any) {
        this.logger.info("CategoryController - updateCategory()");

        const id = req.params.id;
        const category:ICategory = req.body;
        await this.categoryService.updateCategory(id , category)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

    public async deleteCategory(req:any,res:any) {
        this.logger.info("CategoryController - deleteCategory()");
        const id = req.params.id;
        await this.categoryService.deleteCategory(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
}
