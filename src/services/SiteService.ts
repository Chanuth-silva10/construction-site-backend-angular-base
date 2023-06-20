import {ISite} from "../interfaces/ISite";
import {Logger} from "../loaders/logger";
import {ISiteService} from "./interfaces/ISiteService";
import {SiteDao} from "../dao/SiteDao";

export class SiteService implements ISiteService{
    private logger = Logger.getInstance();
    public static instance:SiteService = null;
    private SiteDao = SiteDao.getInstance();
    public static getInstance():SiteService{
        if(this.instance === null){
            this.instance = new SiteService();
        }
        return this.instance;
    }

    public async createSite(request:ISite):Promise<ISite>{
        this.logger.info("Site Services - createSite()");

        return await this.SiteDao.save(request)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getAllSite():Promise<ISite[]>{
        this.logger.info("Site Services - getAllSite()");
        return await this.SiteDao.getAll()
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getSiteById(id:String):Promise<ISite | Object>{
        this.logger.info("Site Services - getSiteById()");
        return await this.SiteDao.getById(id)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }

    public async updateSite(id:String,site:ISite):Promise<ISite | Object>{
        this.logger.info("Site Services - updateSite()");
        return await this.SiteDao.update(id,site)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async deleteSite(id:String):Promise<ISite | Object>{
        this.logger.info("Site Services - deleteSite()");
        return await this.SiteDao.delete(id)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
}
