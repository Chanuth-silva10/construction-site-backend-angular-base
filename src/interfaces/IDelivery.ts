interface IDeliveryItem {
    itemId: string,
    delivered: number
};

export interface IDelivery {
    _id?: string,
    deliveryId: number,
    date: string,
    orderId: number,
    status?: string,
    supplierId: string,
    items: IDeliveryItem[],
    comment: string
}