import { IUser } from '../interfaces/IUser';
import * as mongoose from 'mongoose';

const { Schema } = mongoose;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true
    }
}, { discriminatorKey: 'userType' });

export default mongoose.model<IUser & mongoose.Document>('users', UserSchema);
