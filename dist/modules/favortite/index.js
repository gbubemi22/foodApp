import express from "express";
import { Create, ListAllFavorite, ListOneFavorite, Remove, } from "./controller.js";
import { verifyToken } from "../../middleware/auth.js";
const router = express.Router();
router.route("/").post(verifyToken, Create);
router.route("/").get(verifyToken, ListAllFavorite);
router.route("/:itemId").get(verifyToken, ListOneFavorite);
router.route("/:itemId").delete(verifyToken, Remove);
export default router;
