import {Logger} from "../loaders/logger";
import {PaymentService} from "../services/PaymentService";
import {IPayment} from "../interfaces/IPayment";
import {IPaymentService} from "../services/interfaces/IPaymentService";
const autoBind = require('auto-bind');

export default class PaymentController {

    private logger:Logger;
    private paymentService:IPaymentService;

    constructor(){
        this.logger = Logger.getInstance();
        this.paymentService = PaymentService.getInstance();
        autoBind(this);
    }

    public async addPayment(req:any, res:any){
        this.logger.info("PaymentController - addPayment()");

        if(req.body){
            await this.paymentService.addPayment(req.body)
                .then(data => {
                    res.status(200).send(data);
                })
                .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({err:error.message});
                });
        }
    }

    public async viewPayments(req:any, res:any) {
        this.logger.info("PaymentController - viewPayments()");

        await this.paymentService.viewPayments()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }

    public async getPaymentById(req:any, res:any) {
        this.logger.info("PaymentController - getPaymentById()");
        const id = req.params.id;
        await this.paymentService.getPaymentById(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }

    public async editPayment(req:any, res:any) {
        this.logger.info("PaymentController - editPayment()");

        const id = req.params.id;
        const payment:IPayment = req.body;
        await this.paymentService.editPayment(id ,payment)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }

    public async deletePayment(req:any, res:any) {
        this.logger.info("PaymentController - deletePayment()");
        const id = req.params.id;
        await this.paymentService.deletePayment(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }
}
