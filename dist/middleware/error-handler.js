import { StatusCodes } from 'http-status-codes';
export const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    let customError = {
        statusCode: err.statusCode || StatusCodes.BAD_REQUEST,
        msg: err.message || 'Something went wrong, please try again later',
    };
    if (err.name === 'ValidationError') {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(',');
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    if (err.code && err.code === 11000) {
        customError.msg = `Duplicate value entered for ${Object.keys(err.keyValue)} field, please choose another value`;
        customError.statusCode = StatusCodes.CONFLICT;
    }
    if (err.name === 'CastError') {
        customError.msg = `No item found with id: ${err.value}`;
        customError.statusCode = StatusCodes.NOT_FOUND;
    }
    res.status(customError.statusCode).json({
        success: false,
        message: err.message || 'Internal Server Error',
        httpStatusCode: err.httpStatusCode,
        error: err.error || 'VALIDATION_ERROR',
        service: process.env.SERVICE_NAME,
    });
};
