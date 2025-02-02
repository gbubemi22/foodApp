import express from 'express';
import { VerifyPayment } from './controller.js';
const router = express.Router();
router.route("/").get(VerifyPayment);
export default router;
