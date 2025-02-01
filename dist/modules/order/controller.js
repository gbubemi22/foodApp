import { StatusCodes } from "http-status-codes";
import { create, listCustomerOrders, listOneCustomerOrder, listOneVendorOrder, listVendorsOrders, trackOrder, updateOrderStatus, } from "./service.js";
export const Create = async (req, res, next) => {
    try {
        const userId = req.user.id;
        res.status(StatusCodes.CREATED).json(await create(userId, req.body));
    }
    catch (error) {
        next(error);
    }
};
/////Customers ///////////////
export const ListOneCustomerOrder = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const { orderId } = req.params;
        res
            .status(StatusCodes.CREATED)
            .json(await listOneCustomerOrder(orderId, userId));
    }
    catch (error) {
        next(error);
    }
};
export const ListCustomerOrders = async (req, res, next) => {
    try {
        const userId = req.user.id;
        res.status(StatusCodes.CREATED).json(await listCustomerOrders(userId));
    }
    catch (error) {
        next(error);
    }
};
export const TrackOrder = async (req, res, next) => {
    try {
        res
            .status(StatusCodes.CREATED)
            .json(await trackOrder(req.params.trackId, req.user.id));
    }
    catch (error) {
        next(error);
    }
};
/////// Vendor ////////////////
export const ListOneVendorOrder = async (req, res, next) => {
    try {
        const vendorId = req.user.id;
        const { orderId } = req.params;
        res
            .status(StatusCodes.CREATED)
            .json(await listOneVendorOrder(orderId, vendorId));
    }
    catch (error) {
        next(error);
    }
};
export const ListVendorsOrders = async (req, res, next) => {
    try {
        const vendorId = req.user.id;
        res.status(StatusCodes.CREATED).json(await listVendorsOrders(vendorId));
    }
    catch (error) {
        next(error);
    }
};
export const UpdateOrderStatus = async (req, res, next) => {
    try {
        const vendorId = req.user.id;
        const { orderId } = req.params;
        const { status } = req.body;
        res
            .status(StatusCodes.CREATED)
            .json(await updateOrderStatus(orderId, vendorId, status));
    }
    catch (error) {
        next(error);
    }
};
