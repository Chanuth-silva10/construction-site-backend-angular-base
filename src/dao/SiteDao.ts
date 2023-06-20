import {Logger} from "../loaders/logger";
import {ISite} from "../interfaces/ISite";
import Site from "../models/Site";

export class SiteDao{

    private logger = Logger.getInstance();
    public static instance:SiteDao = null;

    public static getInstance():SiteDao{
        if(this.instance === null){
            this.instance = new SiteDao();
        }
        return this.instance;
    }

    public async save(request:ISite){
        this.logger.info("SiteDao - save()");
        const site = new Site(request);
        return await site.save()
            .then(data=>{
                this.logger.info(`Site ${data.siteName} Inserted Successfully`)
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in inserting site" + error.message);
                throw error;
            })
    }
    public async getAll(){
        this.logger.info("SiteDao - getAll()");
        return await Site.find({}).populate('manager')
            .then(data=>{
                if(data.length>0){
                    this.logger.info(`Site Retrieved Successfully`);
                }else{
                    this.logger.info(`Site Not Found`);
                }
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in retrieving sites" + error.message);
                throw error;
            })
    }

    public async getById(id:String){
        this.logger.info("SiteDao - getById()");
        return await Site.findById(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.siteName} Site Retrieved Successfully`)
                    return data;
                }else{
                    this.logger.info(`Site ${id} Not Found`)
                    return {msg:"Category Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in retrieving site ${id} ${error.message}`);
                throw error;
            })
    }

    public async update(id:String,site:ISite){
        this.logger.info("SiteDao - update()");
        return await Site.findByIdAndUpdate(id,{$set:site},{new:true})
            .then(data=>{
                if(data){
                    this.logger.info(`${data.siteName} Site Updated Successfully`);
                    return data;
                }else{
                    this.logger.info(`Site ${id} Not Found`);
                    return {msg:"Site Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in updating Site ${id} ${error.message}`);
                throw error;
            })
    }

    public async delete(id:String){
        this.logger.info("SiteDao - delete()");
        
        return await Site.findByIdAndDelete(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.siteName} Site Deleted Successfully`);
                    return data;
                }else{
                    this.logger.info(`Site ${id} Not Found`);
                    return {msg:"Site Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in deleting Site ${id} ${error.message}`);
                throw error;
            })
    }
}
