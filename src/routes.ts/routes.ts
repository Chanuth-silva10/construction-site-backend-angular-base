import * as express from "express";
import LoginController from "../controllers/LoginController";
import { multerMiddleWare } from "../middleware/multer";
import EmployeeController from "../controllers/EmployeeController";
import CategoryController from "../controllers/CategoryController";

export default function setRoutes(app:any){

    const router = express();
    const loginControl = new LoginController();
    const employeeControl = new EmployeeController();
    const categoryControl = new CategoryController();

    app.use("/api",router);

    //Routes
    // Login Routes
    router.route('/auth/login').post(loginControl.authenticate);

     // Employee Routes
    router.route('/employees').post(employeeControl.addEmployee);
    router.route('/employees').get(employeeControl.viewEmployees);
    router.route("/employees/status").put(employeeControl.updateEmployeeStatus);
    router.route('/employees/type/:type').get(employeeControl.getEmployeeByType);
    router.route('/employees/:id').get(employeeControl.getEmployeeById);
    router.route('/employees/:id').put(multerMiddleWare({type:'single', path:'employee'}), employeeControl.editEmployee);
    router.route('/employees/image/:name').get(employeeControl.getEmployeeAvatar);
    router.route('/employees/:id').delete(employeeControl.deleteEmployee);
    router.route('/employees/change-password/:id').put(employeeControl.updateEmployeePassword);


         //Category Routes
    router.route("/category").post(categoryControl.createCategory);
    router.route("/category").get(categoryControl.getAllCategory);
    router.route("/category/:id").get(categoryControl.getCategoryById);
    router.route("/category/:id").put(categoryControl.updateCategory);
    router.route("/category/:id").delete(categoryControl.deleteCategory);

}
