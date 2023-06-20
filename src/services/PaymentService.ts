import { IPayment } from '../interfaces/IPayment';
import { Logger } from '../loaders/logger';
import { IPaymentService } from './interfaces/IPaymentService';
import { PaymentDao } from '../dao/PaymentDao';

export class PaymentService implements IPaymentService {
    private logger = Logger.getInstance();
    public static instance: PaymentService = null;
    private paymentDao = PaymentDao.getInstance();

    public static getInstance(): PaymentService {
        if (this.instance === null) {
            this.instance = new PaymentService();
        }

        return this.instance;
    }

    public async addPayment(request: IPayment): Promise<IPayment> {
        this.logger.info('PaymentService - addPayment()');

        return await this.paymentDao.save(request)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async viewPayments(): Promise<IPayment[]> {
        this.logger.info('PaymentService - viewPayments()');

        return await this.paymentDao.getAll()
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async getPaymentById(id: String): Promise<IPayment | Object> {
        this.logger.info('PaymentService - getPaymentById()');

        return await this.paymentDao.getById(id)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async editPayment(id: String, payment: IPayment): Promise<IPayment | Object> {
        this.logger.info('PaymentService - editPayment()');

        return await this.paymentDao.update(id, payment)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }

    public async deletePayment(id: String): Promise<IPayment | Object> {
        this.logger.info('PaymentService - deletePayment()');

        return await this.paymentDao.delete(id)
            .then(data => {
                return data;
            })
            .catch(error => {
                this.logger.error(error.message);
                throw error;
            });
    }
}
