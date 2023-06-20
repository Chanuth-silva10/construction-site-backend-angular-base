import { IPayment } from '../../interfaces/IPayment';

export interface IPaymentService {
    addPayment(request: IPayment): Promise<IPayment>;
    viewPayments(): Promise<IPayment[]>;
    getPaymentById(id: String): Promise<IPayment | Object>;
    editPayment(id: String, payment: IPayment): Promise<IPayment | Object>;
    deletePayment(id: String): Promise<IPayment | Object>;
}
