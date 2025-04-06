import express from "express";
import { Add, List, ListExtras, ListFood, ListFreshFood, ListOne, Remove, Update, } from "./controller.js";
import { verifyToken } from "../../middleware/auth.js";
export const router = express.Router();
//////// VENDOR ////////
router.route("/food").get(verifyToken, ListFood);
router.route("/extras").get(verifyToken, ListExtras);
router.route("/").post(verifyToken, Add);
router.route("/").get(List);
router.route("/:itemId").get(verifyToken, ListOne);
router.route("/fresh/food").get(verifyToken, ListFreshFood);
router.route("/:itemId").delete(verifyToken, Remove);
router.route("/:itemId").patch(verifyToken, Update);
export default router;
