import { Logger } from '../loaders/logger';
import { IDelivery } from '../interfaces/IDelivery';
import Delivery from '../models/Delivery';

export class DeliveryDao {
    private logger = Logger.getInstance();
    public static instance: DeliveryDao = null;

    public static getInstance(): DeliveryDao {
        if (this.instance === null) {
            this.instance = new DeliveryDao();
        }

        return this.instance;
    }

    public async save(request: IDelivery) {
        this.logger.info('DeliveryDao - save()');
        const delivery = new Delivery(request);

        // Increment delivery ID
        let latestDelivery = await Delivery.find().sort({ date: -1 }).limit(1);
        
        if (latestDelivery.length > 0){
            delivery.deliveryId = latestDelivery[0].deliveryId + 1;
        } else {
            delivery.deliveryId = 1000;
        }

        return await delivery.save()
            .then(data => {
                this.logger.info(`Delivery ${data._id} Inserted Successfully`);
                return data;
            })
            .catch(error => {
                this.logger.error('Error in inserting delivery' + error.message);
                throw error;
            });
    }

    public async getAll() {
        this.logger.info('DeliveryDao - getAll()');

        return await Delivery.find({}).populate(['supplierId', 'orderId'])
            .then(data => {
                if (data.length > 0) {
                    this.logger.info('Deliverys Retrieved Successfully');
                } else {
                    this.logger.error('Deliverys Not Found');
                }

                return data;
            })
            .catch(error => {
                this.logger.error('Error in retrieving deliverys' + error.message);
                throw error;
            });
    }

    public async getById(id: String) {
        this.logger.info('DeliveryDao - getById()');

        return await Delivery.findById(id)
            .then(data => {
                if (data) {
                    this.logger.info(`${id} Delivery Retrieved Successfully`);
                    return data;
                } else {
                    this.logger.info(`Delivery ${id} Not Found`);
                    return { msg: 'Delivery Not Found' };
                }
            })
            .catch(error => {
                this.logger.error(`Error in retrieving delivery ${id} ${error.message}`);
                throw error;
            });
    }

    public async update(id: String, delivery: IDelivery) {
        this.logger.info('DeliveryDao - update()');

        return await Delivery.findByIdAndUpdate(id, {$set: delivery}, {new: true})
            .then(data => {
                if (data) {
                    this.logger.info(`${id} Delivery Updated Successfully`);
                    return data;
                } else {
                    this.logger.info(`Delivery ${id} Not Found`);
                    return { msg: 'Delivery Not Found' };
                }
            })
            .catch(error => {
                this.logger.error(`Error in updating delivery ${id} ${error.message}`);
                throw error;
            });
    }

    public async delete(id: String) {
        this.logger.info('DeliveryDao - delete()');

        return await Delivery.findByIdAndDelete(id)
            .then(data => {
                if (data) {
                    this.logger.info(`${id} Delivery Deleted Successfully`);
                    return data;
                } else {
                    this.logger.info(`Delivery ${id} Not Found`);
                    return {msg: 'Delivery Not Found'};
                }
            })
            .catch(error => {
                this.logger.error(`Error in deleting delivery ${id} ${error.message}`);
                throw error;
            })
    }
}
