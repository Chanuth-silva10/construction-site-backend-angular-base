import { IDelivery } from '../../interfaces/IDelivery';

export interface IDeliveryService {
    addDelivery(request: IDelivery): Promise<IDelivery>;
    viewDeliveries(): Promise<IDelivery[]>;
    getDeliveryById(id: String): Promise<IDelivery | Object>;
    editDelivery(id: String, payment: IDelivery): Promise<IDelivery | Object>;
    deleteDelivery(id: String): Promise<IDelivery | Object>;
}
