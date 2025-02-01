import dotenv from "dotenv";
dotenv.config();
import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { Controller } from "../utils/constant.js";
import { getSession } from "../utils/session.js";




export const verifyToken: Controller = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Authorization header is missing or invalid",
      httpStatusCode: 401,
      error: "VALIDATION_ERROR",
      service: process.env.SERVICE_NAME as string,
    });
  }

  const token = authHeader.substring(7);

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    async (err: jwt.VerifyErrors | null, decoded: any) => {
      if (err) {
        console.error("Token verification failed:", err);
        return res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: "Invalid token",
          httpStatusCode: 401,
          error: "VALIDATION_ERROR",
          service: process.env.SERVICE_NAME as string,
        });
      }

      console.log("Decoded token:", decoded);

      // Ensure the token contains the required user ID
      if (!decoded || !decoded.id) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: "Token payload is invalid",
          httpStatusCode: 401,
          error: "VALIDATION_ERROR",
          service: process.env.SERVICE_NAME as string,
        });
      }

      // Fetch the session using the decoded user ID
      try {
        const session = await getSession(decoded.id);

        if (!session) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Please login again.",
            httpStatusCode: 401,
            error: "VALIDATION_ERROR",
            service: process.env.SERVICE_NAME as string,
          });
        }

        // Attach both decoded token and session to the request object
        req.user = decoded;
        // req.session = session;

        // Call the next middleware or route handler
        next();
      } catch (sessionError) {
        console.error("Session fetch error:", sessionError);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: "Failed to fetch session",
          httpStatusCode: 500,
          error: "INTERNAL_SERVER_ERROR",
          service: process.env.SERVICE_NAME as string,
        });
      }
    }
  );
};


// export const verifyToken: Controller = async (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(StatusCodes.UNAUTHORIZED).json({
//       success: false,
//       message: "Authorization header is missing or invalid",
//       httpStatusCode: 401,
//       error: "VALIDATION_ERROR",
//       service: process.env.SERVICE_NAME as string,
//     });
//   }

//   const token = authHeader.substring(7);

//   jwt.verify(
//     token,
//     process.env.ACCESS_TOKEN_SECRET as string,
//     async (err: jwt.VerifyErrors | null, decoded: any) => {
//       if (err) {
//         console.error("Token verification failed:", err);
//         return res.status(StatusCodes.UNAUTHORIZED).json({
//           success: false,
//           message: "Invalid token",
//           httpStatusCode: 401,
//           error: "VALIDATION_ERROR",
//           service: process.env.SERVICE_NAME as string,
//         });
//       }

//       console.log("Decoded token:", decoded);

//       // Ensure the token contains the required user ID
//       if (!decoded || !decoded.id) {
//         return res.status(StatusCodes.UNAUTHORIZED).json({
//           success: false,
//           message: "Token payload is invalid",
//           httpStatusCode: 401,
//           error: "VALIDATION_ERROR",
//           service: process.env.SERVICE_NAME as string,
//         });
//       }

//       // Fetch the session using the decoded user ID
//       try {
//         const session = await getVendorSession(decoded.id);

//         if (!session) {
//           return res.status(StatusCodes.UNAUTHORIZED).json({
//             success: false,
//             message: "Please login again.",
//             httpStatusCode: 401,
//             error: "VALIDATION_ERROR",
//             service: process.env.SERVICE_NAME as string,
//           });
//         }

//         // Attach both decoded token and session to the request object
//         req.user = decoded;
//         // req.session = session;

//         // Call the next middleware or route handler
//         next();
//       } catch (sessionError) {
//         console.error("Session fetch error:", sessionError);
//         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//           success: false,
//           message: "Failed to fetch session",
//           httpStatusCode: 500,
//           error: "INTERNAL_SERVER_ERROR",
//           service: process.env.SERVICE_NAME as string,
//         });
//       }
//     }
//   );
// };