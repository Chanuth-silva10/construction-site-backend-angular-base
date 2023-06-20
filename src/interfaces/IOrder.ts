export interface IOrder{
    orderReferenceNo:number;
    orderNotes:string;
    site:string;
    supplier:string;
    deliveryAddress:string;
    expectedDeliveryDate:Date;
    total:number;
    items:[];
    status:string;
    approvals:[];
    comments:[];
    createdBy:string;
}