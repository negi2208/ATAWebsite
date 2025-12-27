import express from "express";
// import { getAdminDashboardController, getAllUsersController, getAllVendorsController, getVendorByIdController, updateVendorStatusController, getAllProductsController , getPaymentsController, getProductByIdController, updateProductStatusController, getAllOrders, getOrderDetails, getPaymentCommission } from "../../controllers/admin/adminManagementController.js";
import { getAllUsersController, getAllProductsController, getProductByIdController } from "./adminManagement.controller.js"
// import { isAdminLoginIn } from "../../middlewares/authMiddlewares.js"

const router = express.Router();

// dashboard
// router.get("/dashboard", getAdminDashboardController);

// users management
router.get("/user", getAllUsersController);

// products management
router.get("/product/", getAllProductsController);
router.get("/product/:id", getProductByIdController);

// // orders management
// router.get("/order", getAllOrders);       
// router.get("/order/:id", getOrderDetails);

// // payment management 
// router.get('/payment', getPaymentsController );

// // payment commission
// router.get("/payment-commission",getPaymentCommission);

export default router;
