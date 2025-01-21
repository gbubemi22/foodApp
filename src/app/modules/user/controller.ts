import { StatusCodes } from "http-status-codes";
import { Controller } from "../../utils/constant.js";
import {
  create,
  forgetPassword,
  getProfile,
  login,
  resetPassword,
  sendOtpToMail,
  updateUserProfile,
  uploadImage,
  verifyEmail,
} from "./service.js";
import { uploadToS3 } from "../../utils/aws.js";

export const Create: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.CREATED).json(await create(req.body));
  } catch (error) {
    next(error);
  }
};

export const VerifyEmail: Controller = async (req, res, next) => {
  try {
    const { email, otp_token } = req.body;
    res.status(StatusCodes.CREATED).json(await verifyEmail(email, otp_token));
  } catch (error) {
    next(error);
  }
};

export const SendOtpToMail: Controller = async (req, res, next) => {
  try {
    const { email } = req.body;
    res.status(StatusCodes.OK).json(await sendOtpToMail(email));
  } catch (error) {
    next(error);
  }
};

export const Login: Controller = async (req, res, next) => {
  try {
    const { phoneNumber, email, password } = req.body;
    res.status(StatusCodes.OK).json(await login(phoneNumber, email, password));
  } catch (error) {
    next(error);
  }
};

export const ForgetPassword: Controller = async (req, res, next) => {
  try {
    const { email } = req.body;
    res.status(StatusCodes.OK).json(await forgetPassword(email));
  } catch (error) {
    next(error);
  }
};

export const ResetPassword: Controller = async (req, res, next) => {
  try {
    const { email, password, otp_token } = req.body;
    res
      .status(StatusCodes.OK)
      .json(await resetPassword(email, password, otp_token));
  } catch (error) {
    next(error);
  }
};

export const GetProfile: Controller = async (req, res, next) => {
  try {
    const userId = req.user.id;
    res.status(StatusCodes.OK).json(await getProfile(userId));
  } catch (error) {
    next(error);
  }
};

export const UpdateUserProfile: Controller = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { fullName, phoneNumber, email } = req.body;
    res
      .status(StatusCodes.OK)
      .json(await updateUserProfile(userId, fullName, phoneNumber, email));
  } catch (error) {
    next(error);
  }
};


export const UploadImage: Controller = async (req, res, next) => {
  try {
    const userId = req.user.id;
    if (!req.files || !req.files.image) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "No image uploaded" });
    }
    const image = req.files.image;
   

    const imageUrl = await uploadToS3(image);
    res
      .status(StatusCodes.CREATED)
      .json(await uploadImage(userId, imageUrl));
  } catch (error) {
    next(error);
  }
};