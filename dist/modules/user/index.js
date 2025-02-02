import express from "express";
import { joiValidator } from "../../utils/validator.js";
import validation from "../../utils/validator.js";
import { Create, Login, UpdateUserProfile, GetProfile, SendOtpToMail, ForgetPassword, ResetPassword, VerifyEmail, UploadImage, } from "./controller.js";
import { verifyToken } from "../../middleware/auth.js";
const router = express.Router();
router.route("/register").post(joiValidator(validation.create), Create);
router.route("/login").post(joiValidator(validation.login), Login);
router
    .route("/send-otp-email")
    .post(joiValidator(validation.SendOtpToMail), SendOtpToMail);
router
    .route("/verify-email")
    .post(joiValidator(validation.VerifyEmail), VerifyEmail);
router
    .route("/forget-password")
    .post(joiValidator(validation.ForgetPassword), ForgetPassword);
router
    .route("/reset-password")
    .patch(joiValidator(validation.ResetPassword), ResetPassword);
router.route("/update-profile").patch(verifyToken, UpdateUserProfile);
router.route("/profile").get(verifyToken, GetProfile);
router.route("/profile-picture").patch(verifyToken, UploadImage);
export default router;
