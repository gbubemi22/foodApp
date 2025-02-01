import { Router } from "express";
import userRoute from "../modules/user/index.js";
import vendorRoute from "../modules/vendor/index.js";
import itemRoute from "../modules/store/index.js";
import adminRoute from "../modules/admin/index.js";
import dashboardRoute from "../modules/admin/dashboard/index.js";
import orderRoute from "../modules/order/index.js";
import paymentRoute from "../modules/payment/index.js";
import trxRoute from "../modules/transaction/index.js";
import invoiceRoute from "../modules/invoice/index.js";
import FavoriteRouter from "../modules/favortite/index.js";
import vendorDashboardRouter from "../modules/vendordashboard/index.js";

const USER = `/v1/auth`;
const VENDOR = `/v1/vendor/auth`;
const ITEM = `/v1/items`;
const ADMIN = `/v1/admin/auth`;
const ADMINDASHBOARD = `/v1/dashboard`;
const ORDER = `/v1/orders`;
const STRIPE = `/v1/success`;
const TRANSACTION = `/v1/transactions`;
const INVOICE = `/v1/generate-invoice`;
const FAVORITE = `/v1/favorites`;
const VENDORDASHBOARD = `/v1/vendor-dashboard`;

const route = Router();

route.use(USER, userRoute);
route.use(VENDOR, vendorRoute);
route.use(ITEM, itemRoute);
route.use(ADMIN, adminRoute);
route.use(ADMINDASHBOARD, dashboardRoute);
route.use(ORDER, orderRoute);
route.use(STRIPE, paymentRoute);
route.use(TRANSACTION, trxRoute);
route.use(INVOICE, invoiceRoute);
route.use(FAVORITE, FavoriteRouter);
route.use(VENDORDASHBOARD, vendorDashboardRouter);

export default route;
