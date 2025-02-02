import { StatusCodes } from "http-status-codes";
import { getRecentOrdersForVendor, getVendorPerformance, topSellingItemForVendor, trackOrder, } from "./service.js";
export const Stat = async (req, res, next) => {
    try {
        const vendorId = req.user.id;
        res.status(StatusCodes.OK).json(await getVendorPerformance(vendorId));
    }
    catch (error) {
        next(error);
    }
};
export const GetRecentOrdersForVendor = async (req, res, next) => {
    try {
        const vendorId = req.user.id;
        res.status(StatusCodes.OK).json(await getRecentOrdersForVendor(vendorId));
    }
    catch (error) {
        next(error);
    }
};
export const TopSellingItem = async (req, res, next) => {
    try {
        const vendorId = req.user.id;
        res.status(StatusCodes.OK).json(await topSellingItemForVendor(vendorId));
    }
    catch (error) {
        next(error);
    }
};
export const TrackOrder = async (req, res, next) => {
    try {
        const { trackId } = req.params;
        const vendorId = req.user.id;
        res.status(StatusCodes.OK).json(await trackOrder(trackId, vendorId));
    }
    catch (error) {
        next(error);
    }
};
