import {Logger} from "../loaders/logger";
import {IRules} from "../interfaces/IRules";
import Rules from "../models/Rules";

export class RulesDao{

    private logger = Logger.getInstance();
    public static instance:RulesDao = null;

    public static getInstance():RulesDao{
        if(this.instance === null){
            this.instance = new RulesDao();
        }
        return this.instance;
    }

    public async save(request:IRules){
        this.logger.info("RulesDao - save()");
        const rules = new Rules(request);
        return await rules.save()
            .then(data=>{
                this.logger.info(`Rules ${data.name} Inserted Successfully`)
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in inserting product" + error.message);
                throw error;
            })
    }
    public async getAll(){
        this.logger.info("RulesDao - getAll()");
        return await Rules.find({})
            .then(data=>{
                if(data.length>0){
                    this.logger.info(`Rules Retrieved Successfully`);
                }else{
                    this.logger.info(`Rules Not Found`);
                }
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in retrieving rules" + error.message);
                throw error;
            })
    }

    public async getById(id:String){
        this.logger.info("RulesDao - getById()");
        return await Rules.findById(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.name} Rules Retrieved Successfully`)
                    return data;
                }else{
                    this.logger.info(`Rules ${id} Not Found`)
                    return {msg:"Category Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in retrieving Rules ${id} ${error.message}`);
                throw error;
            })
    }

    public async update(id:String,category:IRules){
        this.logger.info("RulesDao - update()");
        return await Rules.findByIdAndUpdate(id,{$set:category},{new:true})
            .then(data=>{
                if(data){
                    this.logger.info(`${data.name} Rules
                     Updated Successfully`);
                    return data;
                }else{
                    this.logger.info(`Rules ${id} Not Found`);
                    return {msg:"Rules Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in updating Rules ${id} ${error.message}`);
                throw error;
            })
    }

    public async delete(id:String){
        this.logger.info("RulesDao - delete()");
        return await Rules.findByIdAndDelete(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.name} Rules Deleted Successfully`);
                    return data;
                }else{
                    this.logger.info(`Rules ${id} Not Found`);
                    return {msg:"Rules Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in deleting Rules ${id} ${error.message}`);
                throw error;
            })
    }

}
