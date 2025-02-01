import express from "express";
import {
  Stat,
  GetRecentOrdersForVendor,
  TopSellingItem,
  TrackOrder,
} from "./controller.js";
import { verifyToken } from "../../middleware/auth.js";

const router = express.Router();

router.route("/stats").get(verifyToken, Stat);

router.route("/recent-orders").get(verifyToken, GetRecentOrdersForVendor);

router.route("/top-selling").get(verifyToken, TopSellingItem);

router.route("/track-order/:trackId").get(verifyToken, TrackOrder);

export default router;
