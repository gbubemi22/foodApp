import { StatusCodes } from "http-status-codes";
import { verifyPayment } from "../../utils/strip.js";
export const VerifyPayment = async (req, res, next) => {
    try {
        const { session_id } = req.query;
        if (typeof session_id === 'string') {
            res.status(StatusCodes.OK).json(await verifyPayment(session_id));
        }
        else {
            res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid session_id" });
        }
    }
    catch (error) {
        next(error);
    }
};
