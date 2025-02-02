export declare class UnauthorizedError extends Error {
    httpStatusCode: number;
    errorCode?: number;
    constructor(message: string, errorCode?: number);
}
export declare class BadRequestError extends Error {
    httpStatusCode: number;
    errorCode?: number;
    constructor(message: string, errorCode?: number);
}
export declare class ConflictError extends Error {
    httpStatusCode: number;
    errorCode?: number;
    constructor(message: string, errorCode?: number);
}
export declare class InternalServerError extends Error {
    httpStatusCode: number;
    errorCode?: number;
    constructor(message: string, errorCode?: number);
}
export declare class UnauthenticatedError extends Error {
    httpStatusCode: number;
    errorCode?: number;
    constructor(message: string, errorCode?: number);
}
export declare class NotFoundError extends Error {
    httpStatusCode: number;
    errorCode?: number;
    constructor(message: string, errorCode?: number);
}
export declare class ValidationError extends Error {
    httpStatusCode: number;
    errorCode?: number;
    constructor(message: string, errorCode?: number);
}
