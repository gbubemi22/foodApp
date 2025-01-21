import { Router } from "express";
import userRoute from "../modules/user/index.js";

const USER = `/v1/auth`;
const WALLET = `/v1/wallets`;
const VTU = `/v1/vtu`;
const PIN = `/v1/pin`;
const TRX = `/v1/transactions`;
const KYC = `/v1/kyc`;

const route = Router();

route.use(USER, userRoute);

export default route;
