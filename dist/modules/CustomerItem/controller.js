import { StatusCodes } from "http-status-codes";
import { listAll, listOneForCustomer, listFreshFoodForCustomer, listFoodForCustomer, listExtrasForCustomer, } from "./service.js";
///////   FOr Customers ////////
export const ListAll = async (req, res, next) => {
    try {
        console.log("WHERE");
        res.status(StatusCodes.OK).json(await listAll());
    }
    catch (error) {
        next(error);
    }
};
export const ListOneForCustomer = async (req, res, next) => {
    try {
        console.log("WHERE-1");
        const { itemId } = req.params;
        res.status(StatusCodes.OK).json(await listOneForCustomer(itemId));
    }
    catch (error) {
        next(error);
    }
};
export const ListFreshFoodForCustomer = async (req, res, next) => {
    try {
        console.log("WHERE-2");
        res.status(StatusCodes.OK).json(await listFreshFoodForCustomer());
    }
    catch (error) {
        next(error);
    }
};
export const ListFoodForCustomer = async (req, res, next) => {
    try {
        console.log("WHERE-3");
        res.status(StatusCodes.OK).json(await listFoodForCustomer());
    }
    catch (error) {
        next(error);
    }
};
export const ListExtrasForCustomer = async (req, res, next) => {
    try {
        console.log("WHERE-4");
        res.status(StatusCodes.OK).json(await listExtrasForCustomer());
    }
    catch (error) {
        next(error);
    }
};
