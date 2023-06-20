import * as express from "express";
import LoginController from "../controllers/LoginController";


export default function setRoutes(app:any){

    const router = express();
    const loginControl = new LoginController();

    app.use("/api",router);

    //Routes
    // Login Routes
    router.route('/auth/login').post(loginControl.authenticate);

}
