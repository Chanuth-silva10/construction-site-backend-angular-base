import * as mongoose from 'mongoose';
import { Db } from 'mongodb';
import config from '../config/config';
import {Logger} from "./logger";

export default async (): Promise<Db> => {
    const logger = Logger.getInstance();
    const connection = await mongoose.connect(config.dbURL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });

    /**
     * MongoDB Connection
     */
    mongoose.connection.on("connected", () => {
        logger.debug("DB Connection Established");
    });

    mongoose.connection.on("reconnected", () => {
        logger.debug("DB Connection Reestablished");
    });

    mongoose.connection.on("disconnected", () => {
        logger.debug("DB Connection Disconnected");
    });

    mongoose.connection.on("close", () => {
        logger.debug("DB Connection Closed");
    });

    mongoose.connection.on("error", (error) => {
        logger.error("DB Connection ERROR: " + error);
    });


    return connection.connection.db;
};