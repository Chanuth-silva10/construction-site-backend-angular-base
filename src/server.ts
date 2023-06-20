import * as express from "express";
import config from "./config/config";
import {Logger} from "./loaders/logger"

async function startServer() {

    const app = express();
    const logger = Logger.getInstance();
    await require('./loaders').default(app);

    app.listen(config.port, () => {
        logger.info(`Server is running on port ${config.port}`);
    }).on("error",(err)=>{
        logger.error(err.toString());
    })
}

startServer().then();