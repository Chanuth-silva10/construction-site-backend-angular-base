import { IDelivery } from '../interfaces/IDelivery';
import { Logger } from '../loaders/logger';
import { IDeliveryService } from './interfaces/IDeliveryService';
import { DeliveryDao } from '../dao/DeliveryDao';

export class DeliveryService implements IDeliveryService {
    private logger = Logger.getInstance();
    public static instance: DeliveryService = null;
    private deliveryDao = DeliveryDao.getInstance();

    public static getInstance(): DeliveryService {
        if (this.instance === null) {
            this.instance = new DeliveryService();
        }

        return this.instance;
    }

    public async addDelivery(request: IDelivery): Promise<IDelivery> {
        this.logger.info('DeliveryService - addDelivery()');

        return await this.deliveryDao.save(request)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async viewDeliveries(): Promise<IDelivery[]> {
        this.logger.info('DeliveryService - viewDeliveries()');

        return await this.deliveryDao.getAll()
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async getDeliveryById(id: String): Promise<IDelivery | Object> {
        this.logger.info('DeliveryService - getDeliveryById()');

        return await this.deliveryDao.getById(id)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async editDelivery(id: String, delivery: IDelivery): Promise<IDelivery | Object> {
        this.logger.info('DeliveryService - editDelivery()');

        return await this.deliveryDao.update(id, delivery)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async deleteDelivery(id: String): Promise<IDelivery | Object> {
        this.logger.info('DeliveryService - deleteDelivery()');

        return await this.deliveryDao.delete(id)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }
}
