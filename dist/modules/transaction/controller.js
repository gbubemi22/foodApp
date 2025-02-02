import { StatusCodes } from "http-status-codes";
import { list, listOne } from "./service.js";
export const List = async (req, res, next) => {
    try {
        const userId = req.user.id;
        res.status(StatusCodes.OK).json(await list(userId));
    }
    catch (error) {
        next(error);
    }
};
export const ListOne = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const trxId = req.params.id;
        res.status(StatusCodes.OK).json(await listOne(trxId, userId));
    }
    catch (error) {
        next(error);
    }
};
