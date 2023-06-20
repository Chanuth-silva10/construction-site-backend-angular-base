import { ILogin } from '../interfaces/ILogin';
import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const LoginSchema = new Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    }
});

LoginSchema.index({ email: 1, type: 1 }, { unique: true });

export default mongoose.model<ILogin & mongoose.Document>('logins', LoginSchema);
