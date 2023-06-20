import {Logger} from "../loaders/logger";
import {RulesService} from "../services/RulesService";
import {IRules} from "../interfaces/IRules";
import {IRulesService} from "../services/interfaces/IRulesService";
const autoBind = require('auto-bind');
export default class RulesController{

    private logger:Logger;
    private rulesService:IRulesService;

    constructor(){
        this.logger = Logger.getInstance();
        this.rulesService = RulesService.getInstance();
        autoBind(this);
    }

    public async createRules(req:any,res:any){
        this.logger.info("RulesController - createRules()");

        if(req.body){
            await this.rulesService.createRules(req.body)
                .then(data => {
                    res.status(200).send(data);
                })

                .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({err:error.message});
                })
        }
    }
    public async getAllRules(req:any,res:any) {
        this.logger.info("RulesController - getAllRules()");

        await this.rulesService.getAllRules()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
    public async getRulesById(req:any,res:any) {
        this.logger.info("RulesController - getRulesById()");
        const id = req.params.id;
        await this.rulesService.getRulesById(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

    public async updateRules(req:any,res:any) {
        this.logger.info("RulesController - updateRules()");

        const id = req.params.id;
        const Rules:IRules = req.body;
        await this.rulesService.updateRules(id ,Rules)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

    public async deleteRules(req:any,res:any) {
        this.logger.info("RulesController - deleteRules()");
        const id = req.params.id;
        await this.rulesService.deleteRules(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
}
