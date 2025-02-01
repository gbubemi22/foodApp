import { StatusCodes } from "http-status-codes";
import { Controller } from "../../utils/constant.js";
import {
  create,
  forgetPassword,
  getProfile,
  login,
  logout,
  resetPassword,
} from "./service.js";

export const Create: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.CREATED).json(await create(req.body));
  } catch (error) {
    next(error);
  }
};

export const Login: Controller = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;
    res.status(StatusCodes.OK).json(await login(phoneNumber, password));
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
     console.log("USER in request:", req.user); // Log the user object
     const vendorId = req.user?.id;
     console.log("CONTROLL", vendorId); 
    res.status(StatusCodes.OK).json(await logout(vendorId));
  } catch (error) {
    next(error);
  }
};

export const GetProfile: Controller = async (req, res, next) => {
  try {
    const vendorId = req.user.id;
    console.log("CONTROLL", vendorId);
    res.status(StatusCodes.OK).json(await getProfile(vendorId));
  } catch (error) {
    next(error);
  }
};
