import { StatusCodes } from "http-status-codes";
import {
  activeVendors,
  approveOrReject,
  blockAndUnblockVendor,
  getTopPerformingVendors,
  getVendor,
  pendingVendors,
  recentOrders,
  totals,
} from "./service.js";
import { Controller } from "../../../utils/constant.js";

export const Totals: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await totals());
  } catch (error) {
    next(error);
  }
};

///////// Vendors ///////////////////////

export const ApproveOrReject: Controller = async (req, res, next) => {
  try {
    const { status, vendorId } = req.body;
    res.status(StatusCodes.OK).json(await approveOrReject(vendorId, status));
  } catch (error) {
    next(error);
  }
};

export const BlockAndUnblockVendor: Controller = async (req, res, next) => {
  try {
    const { vendorId } = req.params;
    res.status(StatusCodes.OK).json(await blockAndUnblockVendor(vendorId));
  } catch (error) {
    next(error);
  }
};

export const PendingVendors: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await pendingVendors());
  } catch (error) {
    next(error);
  }
};

export const GetVendor: Controller = async (req, res, next) => {
  try {
    const { vendorId } = req.params;
    res.status(StatusCodes.OK).json(await getVendor(vendorId));
  } catch (error) {
    next(error);
  }
};

export const ActiveVendors: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await activeVendors());
  } catch (error) {
    next(error);
  }
};

export const GetTopPerformingVendors: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await getTopPerformingVendors());
  } catch (error) {
    next(error);
  }
};

//////// Orders ////////

export const RecentOrders: Controller = async (req, res, next) => {
  try {
    res.status(StatusCodes.OK).json(await recentOrders());
  } catch (error) {
    next(error);
  }
};
