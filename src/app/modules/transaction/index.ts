import express from "express";
import { List, ListOne } from "./controller.js";
import { verifyToken } from "../../middleware/auth.js";

const router = express.Router();

router.route("/").get(verifyToken, List);

router.route("/:trxId").get(verifyToken, ListOne);

export default router;
