import { Logger } from '../loaders/logger';
import { IPayment } from '../interfaces/IPayment';
import Payment from '../models/Payment';

export class PaymentDao {
    private logger = Logger.getInstance();
    public static instance: PaymentDao = null;

    public static getInstance(): PaymentDao {
        if (this.instance === null) {
            this.instance = new PaymentDao();
        }

        return this.instance;
    }

    public async save(request: IPayment) {
        this.logger.info('PaymentDao - save()');
        const payment = new Payment(request);

        // Increment payment ID
        let latestPayment = await Payment.find().sort({ payDate: -1 }).limit(1);
        
        if (latestPayment.length > 0){
            payment.paymentId = latestPayment[0].paymentId + 1;
        } else {
            payment.paymentId = 1000;
        }

        return await payment.save()
            .then(data => {
                this.logger.info(`Payment ${data._id} Inserted Successfully`);
                return data;
            })
            .catch(error => {
                this.logger.error('Error in inserting payment' + error.message);
                throw error;
            });
    }

    public async getAll() {
        this.logger.info('PaymentDao - getAll()');

        return await Payment.find({}).populate('orderId')
            .then(data => {
                if (data.length > 0) {
                    this.logger.info('Payments Retrieved Successfully');
                } else {
                    this.logger.error('Payments Not Found');
                }

                return data;
            })
            .catch(error => {
                this.logger.error('Error in retrieving payments' + error.message);
                throw error;
            });
    }

    public async getById(id: String) {
        this.logger.info('PaymentDao - getById()');

        return await Payment.findById(id)
            .then(data => {
                if (data) {
                    this.logger.info(`${id} Payment Retrieved Successfully`);
                    return data;
                } else {
                    this.logger.info(`Payment ${id} Not Found`);
                    return { msg: 'Payment Not Found' };
                }
            })
            .catch(error => {
                this.logger.error(`Error in retrieving payment ${id} ${error.message}`);
                throw error;
            });
    }

    public async update(id: String, payment: IPayment) {
        this.logger.info('PaymentDao - update()');

        return await Payment.findByIdAndUpdate(id, {$set: payment}, {new: true})
            .then(data => {
                if (data) {
                    this.logger.info(`${id} Payment Updated Successfully`);
                    return data;
                } else {
                    this.logger.info(`Payment ${id} Not Found`);
                    return { msg: 'Payment Not Found' };
                }
            })
            .catch(error => {
                this.logger.error(`Error in updating payment ${id} ${error.message}`);
                throw error;
            });
    }

    public async delete(id: String) {
        this.logger.info('PaymentDao - delete()');

        return await Payment.findByIdAndDelete(id)
            .then(data => {
                if (data) {
                    this.logger.info(`${id} Payment Deleted Successfully`);
                    return data;
                } else {
                    this.logger.info(`Payment ${id} Not Found`);
                    return {msg: 'Payment Not Found'};
                }
            })
            .catch(error => {
                this.logger.error(`Error in deleting payment ${id} ${error.message}`);
                throw error;
            })
    }
}
