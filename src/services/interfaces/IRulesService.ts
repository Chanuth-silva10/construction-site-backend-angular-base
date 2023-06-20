import {IRules} from "../../interfaces/IRules";

export interface IRulesService{
    createRules(request:IRules):Promise<IRules>;
    getAllRules():Promise<IRules[]>;
    getRulesById(id:String):Promise<IRules | Object>;
    updateRules(id:String,product:IRules):Promise<IRules | Object>;
    deleteRules(id:String):Promise<IRules | Object>;
}
