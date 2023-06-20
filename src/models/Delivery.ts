import { IDelivery } from '../interfaces/IDelivery';
import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const DeliverySchema = new Schema({
    deliveryId: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    orderId: {
        type: Schema.Types.ObjectId,
        ref: 'orders',
        required: true
    },
    supplierId: {
        type: Schema.Types.ObjectId,
        ref: 'supplier',
        required: true
    },
    items: {
        type: Array,
        required: true,
    },
    comment: {
        type: String,
        trim: true,
        required: false
    }
}, { timestamps: true });

export default mongoose.model<IDelivery & mongoose.Document>('deliveries', DeliverySchema);
