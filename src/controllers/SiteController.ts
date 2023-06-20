import {Logger} from "../loaders/logger";
import {SiteService} from "../services/SiteService";
import {ISite} from "../interfaces/ISite";
import {ISiteService} from "../services/interfaces/ISiteService";
const autoBind = require('auto-bind');
export default class SiteController{

    private logger:Logger;
    private siteService:ISiteService;

    constructor(){
        this.logger = Logger.getInstance();
        this.siteService = SiteService.getInstance();
        autoBind(this);
    }

    public async createSite(req:any,res:any){
        this.logger.info("SiteController - createSite()");

        if(req.body){
            await this.siteService.createSite(req.body)
                .then(data => {
                    res.status(200).send(data);
                })

                .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({err:error.message});
                })
        }
    }
    public async getAllSite(req:any,res:any) {
        this.logger.info("SiteController - getAllSite()");

        await this.siteService.getAllSite()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
    public async getSiteById(req:any,res:any) {
        this.logger.info("SiteController - getSiteById()");
        const id = req.params.id;
        await this.siteService.getSiteById(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

    public async updateSite(req:any,res:any) {
        this.logger.info("SiteController - updateSite()");

        const id = req.params.id;
        const site:ISite = req.body;
        await this.siteService.updateSite(id , site)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

    public async deleteSite(req:any,res:any) {
        this.logger.info("SiteController - deleteSite()");
        const id = req.params.id;
        await this.siteService.deleteSite(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
}
