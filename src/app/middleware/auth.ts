import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { Controller } from "../utils/constant.js";

export const verifyToken: Controller = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err: jwt.VerifyErrors | null, decoded: any) => {
        if (err) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Invalid token",
            httpStatusCode: 401,
            error: "VALIDATION_ERROR",
            service: process.env.SERVICE_NAME as string,
          });
        } else {
          // Set the decoded token payload on the request object
          req.user = { id: decoded.id, token };

          // Call the next middleware or route handler
          next();
        }
      }
    );
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Authorization header is missing or invalid",
      httpStatusCode: 401,
      error: "VALIDATION_ERROR",
      service: process.env.SERVICE_NAME as string,
    });
  }
};
