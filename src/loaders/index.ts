import expressLoader from './express';
import mongooseLoader from './mongoose';
import {Logger} from "./logger"
export default async (expressApp:any) => {

    const logger = Logger.getInstance()
    await mongooseLoader();
    logger.info('MongoDB Initialized');
    await expressLoader({ app: expressApp });
    logger.info('Express Initialized');
}