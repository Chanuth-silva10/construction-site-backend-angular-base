import { IPayment } from '../interfaces/IPayment';
import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const PaymentSchema = new Schema({
    paymentId: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'orders',
        required: true
    },
    payedAmount: {
        type: Number,
        required: true,
    },
}, { timestamps: true });

export default mongoose.model<IPayment & mongoose.Document>('payments', PaymentSchema);