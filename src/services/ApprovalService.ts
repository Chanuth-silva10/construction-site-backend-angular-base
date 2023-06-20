import {IApproval} from "../interfaces/IApproval";
import {Logger} from "../loaders/logger";
import {IApprovalService} from "./interfaces/IApprovalService";
import {ApprovalDao} from "../dao/ApprovalDao";

export class ApprovalService implements IApprovalService{
    private logger = Logger.getInstance();
    public static instance:ApprovalService = null;
    private ApprovalDao = ApprovalDao.getInstance();
    public static getInstance():ApprovalService{
        if(this.instance === null){
            this.instance = new ApprovalService();
        }
        return this.instance;
    }

    public async addApproval(request:IApproval):Promise<IApproval>{
        this.logger.info("Approval Services - createApproval()");

        return await this.ApprovalDao.save(request)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getAllApprovals():Promise<IApproval[]>{
        this.logger.info("Approval Services - getAllApprovals()");
        return await this.ApprovalDao.getAll()
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getApprovalById(id:String):Promise<IApproval | Object>{
        this.logger.info("Approval Services - getApprovalById()");
        return await this.ApprovalDao.getById(id)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }

    public async editApproval(id:String,Approval:IApproval):Promise<IApproval | Object>{
        this.logger.info("Approval Services - updateApproval()");
        return await this.ApprovalDao.update(id,Approval)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async removeApproval(id:String):Promise<IApproval | Object>{
        this.logger.info("Approval Services - deleteApproval()");
        return await this.ApprovalDao.delete(id)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
}