import {Logger} from "../loaders/logger";
import {DeliveryService} from "../services/DeliveryService";
import {IDelivery} from "../interfaces/IDelivery";
import {IDeliveryService} from "../services/interfaces/IDeliveryService";
import {IOrderService} from "../services/interfaces/IOrderService";
import {OrderService} from "../services/OrderService";
import { OrderStatus } from "../enums/orderStatus";
const autoBind = require('auto-bind');

export default class DeliveryController {

    private logger:Logger;
    private deliveryService:IDeliveryService;
    private orderService: IOrderService;

    constructor(){
        this.logger = Logger.getInstance();
        this.deliveryService = DeliveryService.getInstance();
        this.orderService = OrderService.getInstance();
        autoBind(this);
    }

    public async addDelivery(req:any, res:any){
        this.logger.info("DeliveryController - addDelivery()");

        if(req.body){
            const delivery = req.body;
            const orderId = delivery.orderId;
            let order: any = await this.orderService.getOrderById(orderId);
            let remaining = false;
            
            if (order) {
                order.items.map(orderItem => {
                    delivery.items.map(deliveryItem => {
                        if (orderItem.itemId == deliveryItem.itemId) {
                            orderItem.delivered = deliveryItem.delivered;
                            if (orderItem.delivered < orderItem.qty)
                                remaining = true;
                        }
                    });
                });

                if (remaining)
                    order.status = OrderStatus.partiallyDelivered;
                else
                    order.status = OrderStatus.delivered;

                const result = await this.orderService.editOrder(order._id, order);

                if (result) {
                    await this.deliveryService.addDelivery(delivery)
                    .then(data => {
                        res.status(200).send(data);
                    })
                    .catch(error => {
                        this.logger.error(error.message);
                        res.status(500).send({err:error.message});
                    });
                } else {
                    this.logger.error('Error updating order');
                    res.status(500).send({err:'Error updating order status'});
                }
            } else {
                this.logger.error('Error getting order');
                res.status(500).send({err:'Error getting order details'});
            }
        }
    }

    public async viewDeliveries(req:any, res:any) {
        this.logger.info("DeliveryController - viewDeliveries()");

        await this.deliveryService.viewDeliveries()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }

    public async getDeliveryById(req:any, res:any) {
        this.logger.info("DeliveryController - getDeliveryById()");
        const id = req.params.id;
        await this.deliveryService.getDeliveryById(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            });
    }

    public async editDelivery(req:any, res:any) {
        this.logger.info("DeliveryController - editDelivery()");

        const id = req.params.id;

        if(req.body){
            const delivery = req.body;
            const orderId = delivery.orderId;
            let order: any = await this.orderService.getOrderById(orderId);
            let remaining = false;
            
            if (order) {
                order.items.map(orderItem => {
                    delivery.items.map(deliveryItem => {
                        if (orderItem.itemId == deliveryItem.itemId) {
                            orderItem.delivered = deliveryItem.delivered;
                            if (orderItem.delivered < orderItem.qty)
                                remaining = true;
                        }
                    });
                });

                if (remaining)
                    order.status = OrderStatus.partiallyDelivered;
                else
                    order.status = OrderStatus.delivered;

                const result = await this.orderService.editOrder(order._id, order);

                if (result) {
                    await this.deliveryService.editDelivery(id, delivery)
                    .then(data => {
                        res.status(200).send(data);
                    })
                    .catch(error => {
                        this.logger.error(error.message);
                        res.status(500).send({err:error.message});
                    });
                } else {
                    this.logger.error('Error updating order');
                    res.status(500).send({err:'Error updating order status'});
                }
            } else {
                this.logger.error('Error getting order');
                res.status(500).send({err:'Error getting order details'});
            }
        }
    }

    public async deleteDelivery(req:any, res:any) {
        this.logger.info("DeliveryController - deleteDelivery()");
        const id = req.params.id;

        const delivery: any = await this.deliveryService.getDeliveryById(id);

        if (delivery) {
            const orderId = delivery.orderId;
            let order: any = await this.orderService.getOrderById(orderId);
            let remaining = false;
            
            if (order) {
                order.items.map(orderItem => {
                    delivery.items.map(deliveryItem => {
                        if (orderItem.itemId == deliveryItem.itemId) {
                            orderItem.delivered -= deliveryItem.qty;
                            if (orderItem.delivered < orderItem.qty)
                                remaining = true;
                        }
                    });
                });

                if (remaining)
                    order.status = OrderStatus.partiallyDelivered;
                else
                    order.status = OrderStatus.delivered;

                const result = await this.orderService.editOrder(order._id, order);

                if (result) {
                    await this.deliveryService.deleteDelivery(id)
                        .then(data => {
                            res.status(200).send(data);
                        })
                        .catch(error => {
                            this.logger.error(error.message);
                            res.status(500).send({err: error.message});
                        });
                } else {
                    this.logger.error('Error updating order');
                    res.status(500).send({err:'Error updating order status'});
                }
            } else {
                this.logger.error('Error getting order');
                res.status(500).send({err:'Error getting order details'});
            }
        }
    }
}
