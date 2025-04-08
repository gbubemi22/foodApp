import express from "express";
import {
  Create,
  ForgetPassword,
  GetProfile,
  Login,
  Logout,
  ResetPassword,
  ChangePassword,
} from "./controller.js";
import { verifyToken } from "../../middleware/auth.js";

const router = express.Router();

router.route("/register").post(Create);

router.route("/login").post(Login);

router.route("/forget-password").post(ForgetPassword);

router.route("/reset-password").post(ResetPassword);

router.route("/logout").get(verifyToken, Logout);

router.route("/profile").get(verifyToken, GetProfile);

router.route("/change-password").post(verifyToken, ChangePassword);

export default router;
