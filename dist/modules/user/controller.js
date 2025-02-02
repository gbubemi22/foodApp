import { StatusCodes } from "http-status-codes";
import { create, forgetPassword, getProfile, login, resetPassword, sendOtpToMail, updateUserProfile, uploadImage, verifyEmail, } from "./service.js";
import { uploadToCloudinary } from "../../utils/upload.js";
export const Create = async (req, res, next) => {
    try {
        res.status(StatusCodes.CREATED).json(await create(req.body));
    }
    catch (error) {
        next(error);
    }
};
export const VerifyEmail = async (req, res, next) => {
    try {
        const { email, otp_token } = req.body;
        res.status(StatusCodes.CREATED).json(await verifyEmail(email, otp_token));
    }
    catch (error) {
        next(error);
    }
};
export const SendOtpToMail = async (req, res, next) => {
    try {
        const { email } = req.body;
        res.status(StatusCodes.OK).json(await sendOtpToMail(email));
    }
    catch (error) {
        next(error);
    }
};
export const Login = async (req, res, next) => {
    try {
        const { phoneNumber, email, password } = req.body;
        res.status(StatusCodes.OK).json(await login(phoneNumber, email, password));
    }
    catch (error) {
        next(error);
    }
};
export const ForgetPassword = async (req, res, next) => {
    try {
        const { email } = req.body;
        res.status(StatusCodes.OK).json(await forgetPassword(email));
    }
    catch (error) {
        next(error);
    }
};
export const ResetPassword = async (req, res, next) => {
    try {
        const { email, password, otp_token } = req.body;
        res
            .status(StatusCodes.OK)
            .json(await resetPassword(email, password, otp_token));
    }
    catch (error) {
        next(error);
    }
};
export const GetProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        res.status(StatusCodes.OK).json(await getProfile(userId));
    }
    catch (error) {
        next(error);
    }
};
export const UpdateUserProfile = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { fullName, phoneNumber, email } = req.body;
        res
            .status(StatusCodes.OK)
            .json(await updateUserProfile(userId, fullName, phoneNumber, email));
    }
    catch (error) {
        next(error);
    }
};
export const UploadImage = async (req, res, next) => {
    try {
        const userId = req.user.id;
        if (!req.files || !req.files.image) {
            return res
                .status(StatusCodes.BAD_REQUEST)
                .json({ error: "No image uploaded" });
        }
        const image = req.files.image;
        const imageUrl = await uploadToCloudinary(image);
        res
            .status(StatusCodes.CREATED)
            .json(await uploadImage(userId, imageUrl));
    }
    catch (error) {
        next(error);
    }
};
