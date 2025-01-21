import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { v1 as uuidV1, v4 as uuidV4, validate as UUIDValidation } from "uuid";

export interface DefaultResponseInt {
  success: boolean;
  data?: Array<any> | Record<string, any> | any;
  message: string;
  error?: any;
  httpStatusCode?: number;
  service?: string;
}

export type Controller = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const encodeJwt = ({
  data,
  secretKey = process.env.APP_KEY || "",
  duration = "24h",
}: {
  data: any;
  secretKey: string;
  duration: string;
}): Promise<any> => {
  return new Promise((ful, rej) => {
    if (!secretKey) return rej(new Error("Kindly supply secret key"));
    jwt.sign(data, secretKey, { expiresIn: duration }, (err, token) => {
      if (err) rej(err);
      ful(token);
    });
  });
};

// Define possible KYC statuses
export const KYCStatus = {
  PENDING: "Pending",
  APPROVED: "Approved",
  REJECTED: "Rejected",
};

export const generateTransactionRef = (prefix: string = "TRX"): string => {
  // Generate UUID and remove hyphens
  const uuid = uuidV4().replace(/-/g, "");

  // Take first 12 characters of UUID and combine with prefix
  const reference = `${prefix}_${uuid.substring(0, 12).toUpperCase()}`;

  return reference;
};

export const generateRandomString = (length = 9): string => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export function parseJSON(value: any): any {
  try {
    return JSON.parse(value);
  } catch (err) {
    return value;
  }
}
