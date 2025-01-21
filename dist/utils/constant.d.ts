import { Request, Response, NextFunction } from "express";
export interface DefaultResponseInt {
    success: boolean;
    data?: Array<any> | Record<string, any> | any;
    message: string;
    error?: any;
    httpStatusCode?: number;
    service?: string;
}
export type Controller = (req: Request, res: Response, next: NextFunction) => Promise<any>;
export declare const encodeJwt: ({ data, secretKey, duration, }: {
    data: any;
    secretKey: string;
    duration: string;
}) => Promise<any>;
export declare const KYCStatus: {
    PENDING: string;
    APPROVED: string;
    REJECTED: string;
};
export declare const generateTransactionRef: (prefix?: string) => string;
export declare const generateRandomString: (length?: number) => string;
export declare function parseJSON(value: any): any;
