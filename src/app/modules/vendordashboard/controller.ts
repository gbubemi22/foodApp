import { StatusCodes } from "http-status-codes";
import { Controller } from "../../utils/constant.js";
import {
  getRecentOrdersForVendor,
  getVendorPerformance,
  topSellingItemForVendor,
  trackOrder,
} from "./service.js";

export const Stat: Controller = async (req, res, next) => {
  try {
    const vendorId = req.user.id;
    res.status(StatusCodes.OK).json(await getVendorPerformance(vendorId));
  } catch (error) {
    next(error);
  }
};

export const GetRecentOrdersForVendor: Controller = async (req, res, next) => {
  try {
    const vendorId = req.user.id;
    res.status(StatusCodes.OK).json(await getRecentOrdersForVendor(vendorId));
  } catch (error) {
    next(error);
  }
};

export const TopSellingItem: Controller = async (req, res, next) => {
  try {
    const vendorId = req.user.id;
    res.status(StatusCodes.OK).json(await topSellingItemForVendor(vendorId));
  } catch (error) {
    next(error);
  }
};

export const TrackOrder: Controller = async (req, res, next) => {
  try {
    const { trackId } = req.params;
    const vendorId = req.user.id;
    res.status(StatusCodes.OK).json(await trackOrder(trackId, vendorId));
  } catch (error) {
    next(error);
  }
};
