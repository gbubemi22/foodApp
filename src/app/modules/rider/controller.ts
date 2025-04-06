import { StatusCodes } from "http-status-codes";
import { Controller } from "../../utils/constant.js";
import {
  changePassword,
  create,
  forgetPassword,
  getProfile,
  login,
  logout,
  resetPassword,
  sendOtpToMail,
  updateUserProfile,
  uploadImage,
} from "./service.js";
import { uploadToCloudinary } from "../../utils/upload.js";

import {
  allOrders,
  getUserAverageRating,
  activeDelivery,
  stat,
} from "./dashboard.js";

export const Create: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.CREATED).json(await create(req.body));
  } catch (error) {
    next(error);
  }
};

export const Login: Controller = async (req, res, next) => {
  try {
    const { phoneNumber, email, password } = req.body;
    const { deviceType } = req.deviceInfo;
    const requestDeviceName = req.headers["user-agent"] as string;
    console.log("NAME:", requestDeviceName);

    const deviceName = requestDeviceName;

    res
      .status(StatusCodes.OK)
      .json(await login(phoneNumber, email, password, deviceType, deviceName));
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

export const Logout: Controller = async (req, res, next) => {
  try {
    const riderId = req.user.id;
    res.status(StatusCodes.OK).json(await logout(riderId));
  } catch (error) {
    next(error);
  }
};

export const GetProfile: Controller = async (req, res, next) => {
  try {
    const riderId = req.user.id;
    res.status(StatusCodes.OK).json(await getProfile(riderId));
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

    const imageUrl = await uploadToCloudinary(image);
    res.status(StatusCodes.CREATED).json(await uploadImage(userId, imageUrl));
  } catch (error) {
    next(error);
  }
};

export const ChangePassword: Controller = async (req, res, next) => {
  try {
    const riderId = req.user.id;
    const { currentPassword, newPassword } = req.body;
    res
      .status(StatusCodes.OK)
      .json(await changePassword(riderId, currentPassword, newPassword));
  } catch (error) {
    next(error);
  }
};

export const AllOrders: Controller = async (req, res, next) => {
  try {
    const riderId = req.user.id;

    res.status(StatusCodes.OK).json(await allOrders(riderId));
  } catch (error) {
    next(error);
  }
};

export const Stat: Controller = async (req, res, next) => {
  try {
    const riderId = req.user.id;

    res.status(StatusCodes.OK).json(await stat(riderId));
  } catch (error) {
    next(error);
  }
};

export const AetUserAverageRating: Controller = async (req, res, next) => {
  try {
    const riderId = req.user.id;

    res.status(StatusCodes.OK).json(await getUserAverageRating(riderId));
  } catch (error) {
    next(error);
  }
};

export const ActiveDelivery: Controller = async (req, res, next) => {
  try {
    const riderId = req.user.id;

    res.status(StatusCodes.OK).json(await activeDelivery(riderId));
  } catch (error) {
    next(error);
  }
};
