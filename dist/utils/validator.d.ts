import Joi from "joi";
export declare function joiValidator(constraint: any, isMiddleware?: boolean): any;
declare const _default: {
    create: {
        body: {
            schema: Joi.ObjectSchema<any>;
            location: Joi.ObjectSchema<any>;
        };
    };
    logout: {
        params: {
            schema: Joi.ObjectSchema<any>;
        };
    };
    VerifyEmail: {
        body: {
            schema: Joi.ObjectSchema<any>;
        };
    };
    SendOtpToMail: {
        body: {
            schema: Joi.ObjectSchema<any>;
        };
    };
    ForgetPassword: {
        body: {
            schema: Joi.ObjectSchema<any>;
        };
    };
    ResetPassword: {
        body: {
            schema: Joi.ObjectSchema<any>;
        };
    };
    login: {
        schema: Joi.ObjectSchema<any>;
    };
};
export default _default;
