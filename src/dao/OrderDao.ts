import { Logger } from '../loaders/logger';
import { IOrder } from '../interfaces/IOrder';
import Order from '../models/Order';

export class OrderDao {
    private logger = Logger.getInstance();
    public static instance: OrderDao = null;

    public static getInstance(): OrderDao {
        if (this.instance === null) {
            this.instance = new OrderDao();
        }

        return this.instance;
    }

    public async save(request: IOrder) {
        this.logger.info('OrderDao - save()');
        const order = new Order(request);

        // Increment order ID
        let latestOrder = await Order.find().sort({ createdAt: -1 }).limit(1);
        if(latestOrder.length > 0){
            order.orderReferenceNo = latestOrder[0].orderReferenceNo + 1;
        }else {
            order.orderReferenceNo = 1000;
        }

        return await order.save()
            .then(data => {
                this.logger.info(`Order ${data._id} Inserted Successfully`);
                return data;
            })
            .catch(error => {
                this.logger.error('Error in inserting order' + error.message);
                throw error;
            });
    }

    public async getAll() {
        this.logger.info('OrderDao - getAll()');

        return await Order.find({}).populate(['supplier','site'])
            .then(data => {
                if (data.length > 0) {
                    this.logger.info('Orders Retrieved Successfully');
                } else {
                    this.logger.error('Orders Not Found');
                }

                return data;
            })
            .catch(error => {
                this.logger.error('Error in retrieving orders' + error.message);
                throw error;
            });
    }

    public async getById(id: String) {
        this.logger.info('OrderDao - getById()');

        return await Order.findById(id).populate(['supplier','items.itemId','site'])
            .then(data => {
                if (data) {
                    this.logger.info(`${id} Order Retrieved Successfully`);
                    return data;
                } else {
                    this.logger.info(`Order ${id} Not Found`);
                    return { msg: 'Order Not Found' };
                }
            })
            .catch(error => {
                this.logger.error(`Error in retrieving order ${id} ${error.message}`);
                throw error;
            });
    }

    public async getByStatus(status: string) {
        this.logger.info('OrderDao - getByStatus()');

        return await Order.find({status:status}).populate(['supplier','site'])
            .then(data => {
                console.log(data);
                if (data) {
                    this.logger.info(`Orders of ${status} Retrieved Successfully`);
                    return data;
                } else {
                    this.logger.info(`Orders of ${status} Not Found`);
                    return { msg: 'Order Not Found' };
                }
            })
            .catch(error => {
                // this.logger.error(`Error in retrieving order ${id} ${error.message}`);
                throw error;
            });
    }

    public async addComment(id: String, comment:any) {
        this.logger.info('OrderDao - addComment()');

        return await Order.findByIdAndUpdate(id, {$addToSet: {comments:comment}}, {new: true})
            .then(data => {
                if (data) {
                    this.logger.info(`Comment added to order Successfully`);
                    return data;
                } else {
                    this.logger.info(`Order ${id} Not Found`);
                    return { msg: 'Order Not Found' };
                }
            })
            .catch(error => {
                this.logger.error(`Error in updating order ${id} ${error.message}`);
                throw error;
            });
    }


    public async update(id: String, order: IOrder) {
        this.logger.info('OrderDao - update()');

        return await Order.findByIdAndUpdate(id, {$set: order}, {new: true})
            .then(data => {
                if (data) {
                    this.logger.info(`${id} Order Updated Successfully`);
                    return data;
                } else {
                    this.logger.info(`Order ${id} Not Found`);
                    return { msg: 'Order Not Found' };
                }
            })
            .catch(error => {
                this.logger.error(`Error in updating order ${id} ${error.message}`);
                throw error;
            });
    }

    public async delete(id: String) {
        this.logger.info('OrderDao - delete()');

        return await Order.findByIdAndDelete(id)
            .then(data => {
                if (data) {
                    this.logger.info(`${id} Order Deleted Successfully`);
                    return data;
                } else {
                    this.logger.info(`Order ${id} Not Found`);
                    return {msg: 'Order Not Found'};
                }
            })
            .catch(error => {
                this.logger.error(`Error in deleting order ${id} ${error.message}`);
                throw error;
            })
    }
}
