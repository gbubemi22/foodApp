import { StatusCodes } from "http-status-codes";
import { changePassword, create, forgetPassword, getProfile, login, logout, resetPassword, sendOtpToMail, updateUserProfile, uploadImage, } from "./service.js";
import { uploadToCloudinary } from "../../utils/upload.js";
import { allOrders, getUserAverageRating, activeDelivery, stat, } from "./dashboard.js";
export const Create = async (req, res, next) => {
    try {
        res.status(StatusCodes.CREATED).json(await create(req.body));
    }
    catch (error) {
        next(error);
    }
};
export const Login = async (req, res, next) => {
    try {
        const { phoneNumber, email, password } = req.body;
        const { deviceType } = req.deviceInfo;
        const requestDeviceName = req.headers["user-agent"];
        console.log("NAME:", requestDeviceName);
        const deviceName = requestDeviceName;
        res
            .status(StatusCodes.OK)
            .json(await login(phoneNumber, email, password, deviceType, deviceName));
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
export const Logout = async (req, res, next) => {
    try {
        const riderId = req.user.id;
        res.status(StatusCodes.OK).json(await logout(riderId));
    }
    catch (error) {
        next(error);
    }
};
export const GetProfile = async (req, res, next) => {
    try {
        const riderId = req.user.id;
        res.status(StatusCodes.OK).json(await getProfile(riderId));
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
        res.status(StatusCodes.CREATED).json(await uploadImage(userId, imageUrl));
    }
    catch (error) {
        next(error);
    }
};
export const ChangePassword = async (req, res, next) => {
    try {
        const riderId = req.user.id;
        const { currentPassword, newPassword } = req.body;
        res
            .status(StatusCodes.OK)
            .json(await changePassword(riderId, currentPassword, newPassword));
    }
    catch (error) {
        next(error);
    }
};
export const AllOrders = async (req, res, next) => {
    try {
        const riderId = req.user.id;
        res.status(StatusCodes.OK).json(await allOrders(riderId));
    }
    catch (error) {
        next(error);
    }
};
export const Stat = async (req, res, next) => {
    try {
        const riderId = req.user.id;
        res.status(StatusCodes.OK).json(await stat(riderId));
    }
    catch (error) {
        next(error);
    }
};
export const AetUserAverageRating = async (req, res, next) => {
    try {
        const riderId = req.user.id;
        res.status(StatusCodes.OK).json(await getUserAverageRating(riderId));
    }
    catch (error) {
        next(error);
    }
};
export const ActiveDelivery = async (req, res, next) => {
    try {
        const riderId = req.user.id;
        res.status(StatusCodes.OK).json(await activeDelivery(riderId));
    }
    catch (error) {
        next(error);
    }
};
