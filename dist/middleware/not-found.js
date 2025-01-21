import { StatusCodes } from 'http-status-codes';
export const handleNotFound = (req, res, next) => {
    res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: 'Route does not exist',
        httpStatusCode: StatusCodes.NOT_FOUND,
        error: 'NOT_FOUND_ERROR',
        service: process.env.SERVICE_NAME,
    });
};
