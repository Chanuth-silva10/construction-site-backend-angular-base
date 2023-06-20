import { IOrder } from '../../interfaces/IOrder';

export interface IOrderService {
    addOrder(request: IOrder): Promise<IOrder>;
    viewOrders(): Promise<IOrder[]>;
    getOrderById(id: String): Promise<IOrder | Object>;
    editOrder(id: String, order: IOrder): Promise<IOrder | Object>;
    updateOrderStatus(request: any): Promise<IOrder | Object>;
    deleteOrder(id: String): Promise<IOrder | Object>;
    getOrderByStatusAndEmpType(status:string,empType:string): Promise<IOrder[] | Object>;
    addComment(id: String, comment: any): Promise<IOrder | Object>;
}
