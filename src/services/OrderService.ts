import { IOrder } from '../interfaces/IOrder';
import { Logger } from '../loaders/logger';
import { IOrderService } from './interfaces/IOrderService';
import { OrderDao } from '../dao/OrderDao';
import {RulesService} from "./RulesService";
import {Limitations} from "../enums/limitations";
import {OrderStatus} from "../enums/orderStatus";
import * as nodemailer from 'nodemailer';


export class OrderService implements IOrderService {
    private logger = Logger.getInstance();
    public static instance: OrderService = null;
    private orderDao = OrderDao.getInstance();

    public static getInstance(): OrderService {
        if (this.instance === null) {
            this.instance = new OrderService();
        }

        return this.instance;
    }

    public async addOrder(request: IOrder): Promise<any> {
        this.logger.info('OrderService - addOrder()');

        const order = request;

        const limitations = await RulesService.getInstance().getAllRules();
        if(limitations.length > 0){
            const orderLimit = limitations.filter(limitation=> limitation.name == Limitations.orderLimit);
            if(orderLimit.length>0){
                if(order.total < orderLimit[0].limit){
                    order.status = OrderStatus.placed;
                }else {
                    order.status = OrderStatus.waiting;
                    const approvals:any = [];
                    if(orderLimit[0].approvalType == "single"){
                        const approval = {
                            status:OrderStatus.pending,
                            empType:orderLimit[0].approvals,
                            approvedBy:null
                        }
                        approvals.push(approval)
                    }else{
                        orderLimit[0].approvals.map(empType=>{
                            const approval = {
                                status:OrderStatus.pending,
                                empType:empType,
                                approvedBy:null
                            }
                            approvals.push(approval);
                        })
                    }
                    order.approvals = approvals;
                }
            }
        }

        console.log(order);

        return await this.orderDao.save(request)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async viewOrders(): Promise<IOrder[]> {
        this.logger.info('OrderService - viewOrders()');

        return await this.orderDao.getAll()
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async getOrderById(id: String): Promise<IOrder | Object> {
        this.logger.info('OrderService - getOrderById()');

        return await this.orderDao.getById(id)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }
    public async getOrderByStatusAndEmpType(status:string,empType:string): Promise<IOrder[] | Object> {
        this.logger.info('OrderService - getOrderById()');

        return await this.orderDao.getByStatus(status)
            .then(data => {
                const temp:any = data;
                const orders:IOrder[] = [];
                if(!data.hasOwnProperty("msg")) {
                    temp.map(order => {
                        order.approvals.map(approval => {
                            if (approval.status == OrderStatus.pending) {
                                if (approval.empType.includes(empType)) {
                                    orders.push(order);
                                }
                            }
                        })
                    })
                }


                return orders;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async updateOrderStatus(request:any): Promise<IOrder | Object> {
        this.logger.info('OrderService - updateOrderStatus()');
        let id = request.id;
        let status = request.status;
        let empType = request.empType;
        let empId = request.empId;
        return await this.orderDao.getById(id)
            .then(async data => {
                if(!data.hasOwnProperty("msg")) {
                    const order:any = data;
                    const requiredApprovals = order.approvals.length;
                    let pendingApprovals = 0;
                    let approvedApprovals = 0;
                    order.approvals.map(approval => {
                        if (approval.status == OrderStatus.pending) {
                            pendingApprovals = pendingApprovals + 1;
                            if (approval.empType.includes(empType)) {
                                approvedApprovals = approvedApprovals + 1;
                                approval.approvedBy = empId;
                                approval.status = status;
                            }
                        }
                    })
                    if(status != OrderStatus.declined){
                        if (pendingApprovals == approvedApprovals) {
                            order.status = OrderStatus.approved;
                        } else if (approvedApprovals < pendingApprovals) {
                            order.status = OrderStatus.partiallyApproved;
                        }
                    }else if(status == OrderStatus.declined){
                        order.status = OrderStatus.declined;
                    }

                    return await this.orderDao.update(id, order)
                        .then(data => {
                            return data;
                        })
                        .catch(error => {
                            this.logger.error(error.message);
                            throw error;
                        });
                }else{
                    return data;
                }

            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async editOrder(id: String, order: IOrder): Promise<IOrder | Object> {
        this.logger.info('OrderService - editOrder()');

        return await this.orderDao.update(id, order)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async addComment(id: String, comment: any): Promise<IOrder | Object> {
        this.logger.info('OrderService - addComment()');

        return await this.orderDao.addComment(id, comment)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async deleteOrder(id: String): Promise<IOrder | Object> {
        this.logger.info('OrderService - deleteOrder()');

        return await this.orderDao.delete(id)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }
    //This method handles sending emails
    public async sendEmail(email,subject,message){

        //Authenticate the email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        //Message
        const mailOptions = {
            from: 'Procuro',
            to: email,
            subject: subject,
            text: message
        };
        //Send Email
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            }
        });
    }

}
