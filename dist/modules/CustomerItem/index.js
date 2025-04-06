import { verifyToken } from "../../middleware/auth.js";
import express from "express";
import { ListAll, ListFreshFoodForCustomer, ListFoodForCustomer, ListExtrasForCustomer, ListOneForCustomer, } from "./controller.js";
const router = express.Router();
////////   FOR CUSTOMER   ////////
router.route("/all").get(ListAll);
router.route("/fresh-food").get(ListFreshFoodForCustomer);
router.route("/food").get(ListFoodForCustomer);
router.route("/extras").get(ListExtrasForCustomer);
router.route("/:itemId").get(verifyToken, ListOneForCustomer);
export default router;
