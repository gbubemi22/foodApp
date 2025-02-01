import express from "express";
import {
  Create,
  ForgetPassword,
  GetProfile,
  Login,
  Logout,
  ResetPassword,
} from "./controller.js";
import { verifyToken } from "../../middleware/auth.js";



const router = express.Router();

router.route("/profile").get(verifyToken, GetProfile);

router.route("/register").post(Create);

router.route("/login").post(Login);

router.route("/logout").get(verifyToken, Logout);



router.route("/forget-password").post(ForgetPassword);
router.route("/reset-password").post(ResetPassword);

export default router;
