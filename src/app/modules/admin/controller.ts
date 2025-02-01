import { Controller } from "../../utils/constant.js";
import { StatusCodes } from "http-status-codes";
import { create, getProfile, login, logout, resetPassword } from "./service.js";
import { forgetPassword } from "../user/service.js";

export const Create: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.CREATED).json(await create(req.body));
  } catch (error) {
    next(error);
  }
};

export const Login: Controller = async (req, res, next) => {
  try {
    res
      .status(StatusCodes.OK)
      .json(await login(req.body.email, req.body.password));
  } catch (error) {
    next(error);
  }
};

export const Logout: Controller = async (req, res, next) => {
  try {
    const { adminId } = req.user.id;
    res.status(StatusCodes.OK).json(logout(adminId));
  } catch (error) {
    next(error);
  }
};

export const GetProfile: Controller = async (req, res, next) => {
  try {
    const { adminId } = req.user.id;
    console.log("AdminId", adminId);
    res.status(StatusCodes.OK).json(await getProfile(adminId));
  } catch (error) {
    next(error);
  }
};

export const ForgetPassword: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await forgetPassword(req.body.email));
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
