export interface IPayment {
    _id?: string;
    paymentId: number;
    orderId: string;
    date: string;
    payedAmount: number;
}