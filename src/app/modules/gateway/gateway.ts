import dotenv from "dotenv";
dotenv.config();

import { Socket } from "socket.io";
import {
  SocketEnums,
  LocationDto,
  NearByRidersDto,
  AcceptOrderDto,
} from "./type.js";
import { myLocation } from "../rider/service.js";
import { BadRequestError, UnauthenticatedError } from "../../utils/error.js";
import jwt, { Secret } from "jsonwebtoken";
import {
  acceptOrder,
  findNearbyRiders,
  getRiderCurrentLocationByOrder,
  updateRiderLocation,
} from "../delivery/riders.js";

export function verifyJwtToken(token: string): any {
  try {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    console.log("JWT Secret:", secret); // Should never be undefined
    return jwt.verify(token, secret as string);
  } catch (error: any) {
    console.error("JWT verification failed:", error.message);
    throw new UnauthenticatedError("Invalid or expired token");
  }
}

export function HandleUpdateRidersLocSocketEvent(socket: Socket) {
  socket.on(SocketEnums.UPDATE_LOCATION, async (payload: LocationDto) => {
    try {
      const authHeader = socket.handshake.headers.authorization as string;
      console.log(authHeader);

      const token = authHeader?.startsWith("Bearer ")
        ? authHeader.substring(7)
        : authHeader;

      if (!token) {
        return socket.emit(SocketEnums.ERROR, {
          success: false,
          message: "Authorization header is missing or invalid",
          httpStatusCode: 401,
          error: "VALIDATION_ERROR",
          service: process.env.SERVICE_NAME as string,
        });
      }

      const decoded: any = verifyJwtToken(token);
      const riderId = decoded.id;

      const result = await myLocation(riderId, payload.newLocation);

      socket.emit(SocketEnums.LOCATION_UPDATED, result);
    } catch (error) {
      console.error(
        "Error handling HandleUpdateRidersLocSocketEvent socket event:",
        error
      );
      socket.emit(SocketEnums.ERROR, {
        message: "Error processing request",
        service: process.env.SERVICE_NAME,
      });
    }
  });
}

export function HandleFindNearbyRidersSocketEvent(socket: Socket) {
  socket.on(SocketEnums.FIND_RIDERS, async (payload: NearByRidersDto) => {
    try {
      const authHeader = socket.handshake.headers.authorization as string;

      const token = authHeader?.startsWith("Bearer ")
        ? authHeader.substring(7)
        : authHeader;

      if (!token) {
        return socket.emit(SocketEnums.ERROR, {
          success: false,
          message: "Authorization header is missing or invalid",
          httpStatusCode: 401,
          error: "VALIDATION_ERROR",
          service: process.env.SERVICE_NAME as string,
        });
      }

      const decoded: any = verifyJwtToken(token);
      const vendorId = decoded.id;

      const result = await findNearbyRiders(vendorId, payload.orderId);

      socket.emit(SocketEnums.RIDERS_FOUND, result);
    } catch (error) {
      console.error(
        "Error handling HandleFindNearbyRidersSocketEvent socket event:",
        error
      );
      socket.emit(SocketEnums.ERROR, {
        message: "Error processing request",
        service: process.env.SERVICE_NAME,
      });
    }
  });
}

export function HandleAcceptOrderSocketEvent(socket: Socket) {
  socket.on(SocketEnums.ACCEPT_ORDER, async (payload: AcceptOrderDto) => {
    try {
      const authHeader = socket.handshake.headers.authorization as string;

      const token = authHeader?.startsWith("Bearer ")
        ? authHeader.substring(7)
        : authHeader;

      if (!token) {
        return socket.emit(SocketEnums.ERROR, {
          success: false,
          message: "Authorization header is missing or invalid",
          httpStatusCode: 401,
          error: "VALIDATION_ERROR",
          service: process.env.SERVICE_NAME as string,
        });
      }

      const decoded: any = verifyJwtToken(token);
      const riderId = decoded.id;

      const result = await acceptOrder(riderId, payload.orderId);

      socket.emit(SocketEnums.ORDER_ACCEPTED, result);
    } catch (error) {
      console.error(
        "Error handling HandleAcceptOrderSocketEvent socket event:",
        error
      );
      socket.emit(SocketEnums.ERROR, {
        message: "Error processing request",
        service: process.env.SERVICE_NAME,
      });
    }
  });
}

export function HandleUpdateRiderLocationSocketEvent(socket: Socket) {
  socket.on(
    SocketEnums.UPDATE_TRACK_ORDER_LACTATION,
    async (payload: LocationDto) => {
      try {
        const authHeader = socket.handshake.headers.authorization as string;

        const token = authHeader?.startsWith("Bearer ")
          ? authHeader.substring(7)
          : authHeader;

        if (!token) {
          return socket.emit(SocketEnums.ERROR, {
            success: false,
            message: "Authorization header is missing or invalid",
            httpStatusCode: 401,
            error: "VALIDATION_ERROR",
            service: process.env.SERVICE_NAME as string,
          });
        }

        const decoded: any = verifyJwtToken(token);
        const riderId = decoded.id;

        const result = await updateRiderLocation(riderId, payload.newLocation);

        socket.emit(SocketEnums.TRACK_ORDER_LOCATION_UPDATED, result);
      } catch (error) {
        console.error(
          "Error handling HandleUpdateRiderLocationSocketEvent socket event:",
          error
        );
        socket.emit(SocketEnums.ERROR, {
          message: "Error processing request",
          service: process.env.SERVICE_NAME,
        });
      }
    }
  );
}

export function HandleGetRiderCurrentLocationByOrderSocketEvent(
  socket: Socket
) {
  socket.on(SocketEnums.ORDER_LOCATION, async (payload: AcceptOrderDto) => {
    try {
      const result = await getRiderCurrentLocationByOrder(payload.orderId);

      socket.emit(SocketEnums.ORDER_LOCATION_UPDATED, result);
    } catch (error) {
      console.error(
        "Error handling HandleGetRiderCurrentLocationByOrderSocketEvent socket event:",
        error
      );
      socket.emit(SocketEnums.ERROR, {
        message: "Error processing request",
        service: process.env.SERVICE_NAME,
      });
    }
  });
}
