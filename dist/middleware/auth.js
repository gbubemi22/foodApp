import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.substring(7);
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(StatusCodes.UNAUTHORIZED).json({
                    success: false,
                    message: "Invalid token",
                    httpStatusCode: 401,
                    error: "VALIDATION_ERROR",
                    service: process.env.SERVICE_NAME,
                });
            }
            else {
                // Set the decoded token payload on the request object
                req.user = { id: decoded.id, token };
                // Call the next middleware or route handler
                next();
            }
        });
    }
    else {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Authorization header is missing or invalid",
            httpStatusCode: 401,
            error: "VALIDATION_ERROR",
            service: process.env.SERVICE_NAME,
        });
    }
};
