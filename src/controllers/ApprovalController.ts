import {Logger} from "../loaders/logger";
import {ApprovalService} from "../services/ApprovalService";
import {IApproval} from "../interfaces/IApproval";
import {IApprovalService} from "../services/interfaces/IApprovalService";
const autoBind = require('auto-bind');


export default class ApprovalController{

    private logger:Logger;
    private ApprovalService:IApprovalService;

    constructor(){
        this.logger = Logger.getInstance();
        this.ApprovalService = ApprovalService.getInstance();
        autoBind(this);
    }



    public async addApproval(req:any,res:any){
        this.logger.info("ApprovalController - addApproval()");

        if(req.body){
            await this.ApprovalService.addApproval(req.body)
                .then(data => {
                    res.status(200).send(data);
                })
                .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({err:error.message});
                })
        }
    }
    public async getAllApprovals(req:any,res:any) {
        this.logger.info("ApprovalController - getAllApprovals()");

        await this.ApprovalService.getAllApprovals()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
    public async getApprovalById(req:any,res:any) {
        this.logger.info("ApprovalController - getApprovalById()");
        const id = req.params.id;
        await this.ApprovalService.getApprovalById(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

    public async editApproval(req:any,res:any) {
        this.logger.info("ApprovalController - editApproval()");

        const id = req.params.id;
        const Approval:IApproval = req.body;
        await this.ApprovalService.editApproval(id , Approval)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

    public async removeApproval(req:any,res:any) {
        this.logger.info("ApprovalController - removeApproval()");
        const id = req.params.id;
        await this.ApprovalService.removeApproval(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

}
