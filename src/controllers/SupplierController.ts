import {Logger} from "../loaders/logger";
import {SupplierService} from "../services/SupplierService";
import {ISupplier} from "../interfaces/ISupplier";
import {ISupplierService} from "../services/interfaces/ISupplierService";
const autoBind = require('auto-bind');
export default class SupplierController{

    private logger:Logger;
    private supplierService:ISupplierService

    constructor(){
        this.logger = Logger.getInstance();
        this.supplierService = SupplierService.getInstance();
        autoBind(this);
    }

    public async createSupplier(req:any,res:any){
        this.logger.info("SupplierController - createSupplier()");

        if(req.body){
            await this.supplierService.createSupplier(req.body)
                .then(data => {
                    res.status(200).send(data);
                })

                .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({err:error.message});
                })
        }
    }
    public async getAllSupplier(req:any,res:any) {
        this.logger.info("SupplierController - getAllSupplier()");

        await this.supplierService.getAllSupplier()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
    public async getSupplierById(req:any,res:any) {
        this.logger.info("SupplierController - getSupplierById()");
        const id = req.params.id;
        await this.supplierService.getSupplierById(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

    public async updateSupplier(req:any,res:any) {
        this.logger.info("SupplierController - updateSupplier()");

        const id = req.params.id;
        const supplier:ISupplier = req.body;
        await this.supplierService.updateSupplier(id , supplier)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

    public async deleteSupplier(req:any,res:any) {
        this.logger.info("SupplierController - deleteSupplier()");
        const id = req.params.id;
        await this.supplierService.deleteSupplier(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
}
