import {Logger} from "../loaders/logger";
import {OrderService} from "../services/OrderService";
import {IOrder} from "../interfaces/IOrder";
import {IOrderService} from "../services/interfaces/IOrderService";
const autoBind = require('auto-bind');

export default class OrderController {

    private logger:Logger;
    private orderService:IOrderService;

    constructor(){
        this.logger = Logger.getInstance();
        this.orderService = OrderService.getInstance();
        autoBind(this);
    }

    public async addOrder(req:any, res:any){
        this.logger.info("OrderController - addOrder()");

        if(req.body){
            await this.orderService.addOrder(req.body)
                .then(data => {
                    res.status(200).send(data);
                })
                .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({err:error.message});
                });
        }
    }

    public async viewOrders(req:any, res:any) {
        this.logger.info("OrderController - viewOrders()");

        await this.orderService.viewOrders()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }

    public async getOrderById(req:any, res:any) {
        this.logger.info("OrderController - getOrderById()");
        const id = req.params.id;
        await this.orderService.getOrderById(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }

    public async getOrderByStatusAndEmpType(req:any, res:any) {
        this.logger.info("OrderController - getOrderByStatusAndEmpType()");
        const status = req.params.status;
        const empType = req.params.empType;
        await this.orderService.getOrderByStatusAndEmpType(status,empType)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }
    public async editOrder(req:any, res:any) {
        this.logger.info("OrderController - editOrder()");

        const id = req.params.id;
        const order:IOrder = req.body;
        await this.orderService.editOrder(id ,order)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }

    public async addComments(req:any, res:any) {
        this.logger.info("OrderController - addComments()");

        const id = req.params.id;
        const comment:any = req.body;
        await this.orderService.addComment(id ,comment)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }

    public async updateOrderStatus(req:any, res:any) {
        this.logger.info("OrderController - updateOrderStatus()");
        const request = req.body;
        await this.orderService.updateOrderStatus(request)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }

    public async deleteOrder(req:any, res:any) {
        this.logger.info("OrderController - deleteOrder()");
        const id = req.params.id;
        await this.orderService.deleteOrder(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }
}
