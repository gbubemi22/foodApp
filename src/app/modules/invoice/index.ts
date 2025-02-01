import express from "express";
import { GenerateInvoice } from "./controller.js";
import { verifyToken } from "../../middleware/auth.js";

const router = express.Router();

router.route("/").post(verifyToken, GenerateInvoice);

export default router;
