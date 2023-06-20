import {Logger} from "../loaders/logger";
import {IApproval} from "../interfaces/IApproval";
import Approval from "../models/Approval";

export class ApprovalDao{

    private logger = Logger.getInstance();
    public static instance:ApprovalDao = null;

    public static getInstance():ApprovalDao{
        if(this.instance === null){
            this.instance = new ApprovalDao();
        }
        return this.instance;
    }

    public async save(request:IApproval){
        this.logger.info("ApprovalDao - add()");
        const approval = new Approval(request);
        return await approval.save()
            .then(data=>{
                this.logger.info(`Approval ${data.status} Inserted Successfully`)
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in inserting Approval" + error.message);
                throw error;
            })
    }
    public async getAll(){
        this.logger.info("ApprovalDao - getAll()");
        return await Approval.find({})
            .then(data=>{
                if(data.length>0){
                    this.logger.info(`Approvals Retrieved Successfully`);
                }else{
                    this.logger.info(`Approvals Not Found`);
                }
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in retrieving Approvals" + error.message);
                throw error;
            })
    }

    public async getById(id:String){
        this.logger.info("ApprovalDao - getById()");
        return await Approval.findById(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.status} Approval Retrieved Successfully`)
                    return data;
                }else{
                    this.logger.info(`Approval ${id} Not Found`)
                    return {msg:"Approval Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in retrieving Approval ${id} ${error.message}`);
                throw error;
            })
    }

    public async update(id:String,item:IApproval){
        this.logger.info("ApprovalDao - update()");
        return await Approval.findByIdAndUpdate(id,{$set:item},{new:true})
            .then(data=>{
                if(data){
                    this.logger.info(`${data.status} Approval Updated Successfully`);
                    return data;
                }else{
                    this.logger.info(`Approval ${id} Not Found`);
                    return {msg:"Approval Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in updating Approval ${id} ${error.message}`);
                throw error;
            })
    }

    public async delete(id:String){
        this.logger.info("ApprovalDao - delete()");
        return await Approval.findByIdAndDelete(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.status} Approval Deleted Successfully`);
                    return data;
                }else{
                    this.logger.info(`Approval ${id} Not Found`);
                    return {msg:"Approval Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in deleting Approval ${id} ${error.message}`);
                throw error;
            })
    }
}