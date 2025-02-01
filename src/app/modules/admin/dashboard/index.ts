import express from "express";
import {
  Totals,
  ApproveOrReject,
  BlockAndUnblockVendor,
  PendingVendors,
  ActiveVendors,
  GetTopPerformingVendors,
  GetVendor,
  RecentOrders,
} from "./controller.js";

const router = express.Router();

router.route("/stats").get(Totals);

router.route("/approve-reject").post(ApproveOrReject);

router.route("/block-unblock/:vendorId").get(BlockAndUnblockVendor);

router.route("/pending-vendors").get(PendingVendors);

router.route("/vendors/:vendorId").get(GetVendor);

router.route("/active-vendors").get(ActiveVendors);

router.route("/top-performing-vendors").get(GetTopPerformingVendors);

router.route("/recent-orders").get(RecentOrders);

export default router;
