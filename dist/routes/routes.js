"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const LoginController_1 = require("../controllers/LoginController");
const multer_1 = require("../middleware/multer");
const EmployeeController_1 = require("../controllers/EmployeeController");
const CategoryController_1 = require("../controllers/CategoryController");
const ItemController_1 = require("../controllers/ItemController");
const SupplierController_1 = require("../controllers/SupplierController");
const PermissionController_1 = require("../controllers/PermissionController");
const SiteController_1 = require("../controllers/SiteController");
const IRulesController_1 = require("../controllers/IRulesController");
const ApprovalController_1 = require("../controllers/ApprovalController");
const OrderController_1 = require("../controllers/OrderController");
const PaymentController_1 = require("../controllers/PaymentController");
const DeliveryController_1 = require("../controllers/DeliveryController");
function setRoutes(app) {
    const router = express();
    const loginControl = new LoginController_1.default();
    const employeeControl = new EmployeeController_1.default();
    const categoryControl = new CategoryController_1.default();
    const itemControl = new ItemController_1.default();
    const supplierControl = new SupplierController_1.default();
    const permissionControl = new PermissionController_1.default();
    const siteControl = new SiteController_1.default();
    const rulesControl = new IRulesController_1.default();
    const approvalControl = new ApprovalController_1.default();
    const orderControl = new OrderController_1.default();
    const paymentControl = new PaymentController_1.default();
    const deliveryControl = new DeliveryController_1.default();
    app.use("/api", router);
    //Routes
    // Login Routes
    router.route("/auth/login").post(loginControl.authenticate);
    // Employee Routes
    router.route("/employees").post(employeeControl.addEmployee);
    router.route("/employees").get(employeeControl.viewEmployees);
    router.route("/employees/status").put(employeeControl.updateEmployeeStatus);
    router.route("/employees/type/:type").get(employeeControl.getEmployeeByType);
    router.route("/employees/:id").get(employeeControl.getEmployeeById);
    router
        .route("/employees/:id")
        .put((0, multer_1.multerMiddleWare)({ type: "single", path: "employee" }), employeeControl.editEmployee);
    router.route("/employees/image/:name").get(employeeControl.getEmployeeAvatar);
    router.route("/employees/:id").delete(employeeControl.deleteEmployee);
    router
        .route("/employees/change-password/:id")
        .put(employeeControl.updateEmployeePassword);
    //Category Routes
    router.route("/category").post(categoryControl.createCategory);
    router.route("/category").get(categoryControl.getAllCategory);
    router.route("/category/:id").get(categoryControl.getCategoryById);
    router.route("/category/:id").put(categoryControl.updateCategory);
    router.route("/category/:id").delete(categoryControl.deleteCategory);
    // Item Routes
    router.route("/items").post(itemControl.addItem);
    router.route("/items").get(itemControl.getAllItems);
    router.route("/items/supplier/:id").get(itemControl.getItemsBySupplierId);
    router.route("/items/:id").get(itemControl.getItemById);
    router.route("/items/:id").put(itemControl.editItem);
    router.route("/items/:id").delete(itemControl.removeItem);
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
    //Rules Routes
    router.route("/rules").post(rulesControl.createRules);
    router.route("/rules").get(rulesControl.getAllRules);
    router.route("/rules/:id").get(rulesControl.getRulesById);
    router.route("/rules/:id").put(rulesControl.updateRules);
    router.route("/rules/:id").delete(rulesControl.deleteRules);
    // Approval Routes
    router.route("/approval").post(approvalControl.addApproval);
    router.route("/approval").get(approvalControl.getAllApprovals);
    router.route("/approval/:id").get(approvalControl.getApprovalById);
    router.route("/approval/:id").put(approvalControl.editApproval);
    router.route("/approval/:id").delete(approvalControl.removeApproval);
    // Order Routes
    router.route("/orders").post(orderControl.addOrder);
    router.route("/orders").get(orderControl.viewOrders);
    router.route("/orders/status/:id").put(orderControl.updateOrderStatus);
    router.route("/orders/comments/:id").post(orderControl.addComments);
    router
        .route("/orders/:status/:empType")
        .get(orderControl.getOrderByStatusAndEmpType);
    router.route("/orders/:id").get(orderControl.getOrderById);
    router.route("/orders/:id").put(orderControl.editOrder);
    router.route("/orders/:id").delete(orderControl.deleteOrder);
    // Payment Routes
    router.route("/payments").post(paymentControl.addPayment);
    router.route("/payments").get(paymentControl.viewPayments);
    router.route("/payments/:id").get(paymentControl.getPaymentById);
    router.route("/payments/:id").put(paymentControl.editPayment);
    router.route("/payments/:id").delete(paymentControl.deletePayment);
    // Delivery Routes
    router.route('/deliveries').post(deliveryControl.addDelivery);
    router.route('/deliveries').get(deliveryControl.viewDeliveries);
    router.route('/deliveries/:id').get(deliveryControl.getDeliveryById);
    router.route('/deliveries/:id').put(deliveryControl.editDelivery);
    router.route('/deliveries/:id').delete(deliveryControl.deleteDelivery);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map