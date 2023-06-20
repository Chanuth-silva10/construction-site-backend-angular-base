import {IApproval} from "../../interfaces/IApproval";

export interface IApprovalService{
    addApproval(request:IApproval):Promise<IApproval>;
    getAllApprovals():Promise<IApproval[]>;
    getApprovalById(id:String):Promise<IApproval | Object>;
    editApproval(id:String,Approval:IApproval):Promise<IApproval | Object>;
    removeApproval(id:String):Promise<IApproval | Object>;
}