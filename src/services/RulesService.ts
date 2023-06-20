import {IRules} from "../interfaces/IRules";
import {Logger} from "../loaders/logger";
import {IRulesService} from "./interfaces/IRulesService";
import {RulesDao} from "../dao/RulesDao";

export class RulesService implements IRulesService{
    private logger = Logger.getInstance();
    public static instance:RulesService = null;
    private RulesDao = RulesDao.getInstance();
    public static getInstance():RulesService{
        if(this.instance === null){
            this.instance = new RulesService();
        }
        return this.instance;
    }

    public async createRules(request:IRules):Promise<IRules>{
        this.logger.info("Rules Services - createRules()");

        return await this.RulesDao.save(request)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getAllRules():Promise<IRules[]>{
        this.logger.info("Rules Services - getAllRules()");
        return await this.RulesDao.getAll()
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getRulesById(id:String):Promise<IRules | Object>{
        this.logger.info("Rules Services - getRulesById()");
        return await this.RulesDao.getById(id)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }

    public async updateRules(id:String,rules:IRules):Promise<IRules | Object>{
        this.logger.info("Customer Services - updateCustomer()");
        return await this.RulesDao.update(id,rules)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async deleteRules(id:String):Promise<IRules | Object>{
        this.logger.info("Rules Services - deleteRules()");
        return await this.RulesDao.delete(id)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
}
