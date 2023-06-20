import * as express from "express";
import LoginController from "../controllers/LoginController";
import { multerMiddleWare } from "../middleware/multer";
import EmployeeController from "../controllers/EmployeeController";
import CategoryController from "../controllers/CategoryController";
import ItemController from "../controllers/ItemController";
import SupplierController from "../controllers/SupplierController";
import PermissionController from "../controllers/PermissionController";
import SiteController from "../controllers/SiteController";

export default function setRoutes(app:any){

    const router = express();
    const loginControl = new LoginController();
    const employeeControl = new EmployeeController();
    const categoryControl = new CategoryController();
    const itemControl = new ItemController();
    const supplierControl = new SupplierController();
    const permissionControl = new PermissionController();
    const siteControl = new SiteController();

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

     // Item Routes
     router.route('/items').post(itemControl.addItem);
     router.route('/items').get(itemControl.getAllItems);
     router.route('/items/supplier/:id').get(itemControl.getItemsBySupplierId);
     router.route('/items/:id').get(itemControl.getItemById);
     router.route('/items/:id').put(itemControl.editItem);
     router.route('/items/:id').delete(itemControl.removeItem);

     // Supplier Routes
    router.route("/supplier").post(supplierControl.createSupplier);
    router.route("/supplier").get(supplierControl.getAllSupplier);
    router.route("/supplier/:id").get(supplierControl.getSupplierById);
    router.route("/supplier/:id").put(supplierControl.updateSupplier);
    router.route("/supplier/:id").delete(supplierControl.deleteSupplier);

     // Permission Routes
     router.route("/permission").post(permissionControl.createPermission);
     router.route("/permission").get(permissionControl.getAllPermission);
     router.route("/permission/:id").get(permissionControl.getPermissionById);
     router.route("/permission/:id").put(permissionControl.updatePermission);
     router.route("/permission/:id").delete(permissionControl.deletePermission);

      //Site Routes
    router.route("/site").post(siteControl.createSite);
    router.route("/site").get(siteControl.getAllSite);
    router.route("/site/:id").get(siteControl.getSiteById);
    router.route("/site/:id").put(siteControl.updateSite);
    router.route("/site/:id").delete(siteControl.deleteSite);

}
