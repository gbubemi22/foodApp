import express from "express";
import { Create, ListCustomerOrders, ListOneCustomerOrder, ListOneVendorOrder, ListVendorsOrders, TrackOrder, UpdateOrderStatus, } from "./controller.js";
import { verifyToken } from "../../middleware/auth.js";
const router = express.Router();
router.route("/").post(verifyToken, Create);
///// Customers /////
router.route("/track/:trackId").get(verifyToken, TrackOrder);
router.route("/customers/:orderId").get(verifyToken, ListOneCustomerOrder);
router.route("/customers").get(verifyToken, ListCustomerOrders);
//////Vendors ////////
router.route("/vendors/:orderId").get(verifyToken, ListOneVendorOrder);
router.route("/vendors").get(verifyToken, ListVendorsOrders);
router.route("/vendors-update/:orderId").patch(verifyToken, UpdateOrderStatus);
export default router;
