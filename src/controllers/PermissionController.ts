import {Logger} from "../loaders/logger";
import {PermissionService} from "../services/PermissionService";
import {IPermission} from "../interfaces/IPermission";
import {IPermissionService} from "../services/interfaces/IPermissionService";
const autoBind = require('auto-bind');
export default class PermissionController{

    private logger:Logger;
    private permissionService:IPermissionService;

    constructor(){
        this.logger = Logger.getInstance();
        this.permissionService = PermissionService.getInstance();
        autoBind(this);
    }

    public async createPermission(req:any,res:any){
        this.logger.info("PermissionController - createPermission()");

        if(req.body){
            await this.permissionService.createPermission(req.body)
                .then(data => {
                    res.status(200).send(data);
                })

                .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({err:error.message});
                })
        }
    }
    public async getAllPermission(req:any,res:any) {
        this.logger.info("PermissionController - getAllPermission()");

        await this.permissionService.getAllPermission()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
    public async getPermissionById(req:any,res:any) {
        this.logger.info("PermissionController - getPermissionById()");
        const id = req.params.id;
        await this.permissionService.getPermissionById(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

    public async updatePermission(req:any,res:any) {
        this.logger.info("PermissionController - updatePermission()");

        const id = req.params.id;
        const permission:IPermission = req.body;
        await this.permissionService.updatePermission(id , permission)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

    public async deletePermission(req:any,res:any) {
        this.logger.info("PermissionController - deletePermission()");
        const id = req.params.id;
        await this.permissionService.deletePermission(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
}
