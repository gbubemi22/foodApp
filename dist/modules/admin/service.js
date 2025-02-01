import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError, } from "../../utils/error.js";
import Admin from "./model.js";
import { generateOTP, getOtpExpiryTime } from "../../utils/util.js";
import sendEmail from "../../utils/mailtrap.js";
import { hash } from "../../utils/bcryptiUtils.js";
import { createSession, deleteSession } from "../../utils/session.js";
export const create = async (payload) => {
    const checkAdmin = await Admin.findOne({ email: payload.email });
    if (checkAdmin) {
        throw new ConflictError(`Email already in use`);
    }
    const admin = await Admin.create({
        ...payload,
    });
    return {
        status: true,
        message: "Success! admin created",
        data: {
            id: admin._id,
            email: admin.email,
            fullName: admin.fullName,
            role: admin.role,
        },
    };
};
export const login = async (email, password) => {
    const admin = await Admin.findOne({ email: email });
    if (!admin)
        throw new BadRequestError(`Incorrect login details`);
    if (!(await admin.comparePassword(password))) {
        throw new UnauthorizedError("Incorrect login details");
    }
    const token = await admin.generateJWT();
    const sessionPayload = {
        id: admin.id,
        email: admin.email,
    };
    console.log("Payload", sessionPayload);
    const sess = await createSession(admin.id, sessionPayload);
    console.log("SESS", sess);
    return {
        success: true,
        message: `Welcome ${admin.fullName}`,
        data: {
            id: admin._id,
            email: admin.email,
        },
        token,
    };
};
export const getProfile = async (adminId) => {
    const user = await Admin.findById(adminId).select("-password").exec();
    console.log(user);
    if (!user)
        throw new NotFoundError(`Admin not found`);
    return {
        success: true,
        message: `Profile fetched successfully your password.`,
        data: user.toJSON(),
    };
};
export const logout = async (id) => {
    await deleteSession(id);
    return {
        status: true,
        message: "Admin successfully logged out",
        data: {},
    };
};
export const forgetPassword = async (email) => {
    const user = await Admin.findOne({ email });
    if (!user)
        throw new NotFoundError(`User not found`);
    let otp = generateOTP();
    let otp_expires_at = getOtpExpiryTime();
    console.log(otp);
    await Admin.findOneAndUpdate({
        email,
    }, {
        $set: {
            otp: otp,
            expired_at: otp_expires_at,
        },
    }, {
        new: true,
    });
    await sendEmail(user.email, "Email-Verification", otp);
    return {
        success: true,
        message: " Otp sent  successfully!",
        data: [],
    };
};
export const resetPassword = async (email, password, otp_token) => {
    const user = await Admin.findOne({ email });
    if (!user)
        throw new NotFoundError(`User not found`);
    if (user.otp !== otp_token) {
        throw new BadRequestError(`Invalid OTP`);
    }
    const otpExpiryDuration = getOtpExpiryTime();
    if (Date.now() > otpExpiryDuration.getTime())
        throw new BadRequestError(`Expired OTP`);
    const hashedPassword = await hash(password);
    // Update user with new password and unset OTP fields
    const updatedUser = await Admin.findOneAndUpdate({ email }, {
        $set: {
            password: hashedPassword,
        },
        $unset: {
            // Use $unset to remove fields
            otp: "",
            expired_at: "",
        },
    }, { new: true, runValidators: true });
    if (!updatedUser) {
        throw new BadRequestError("Failed to update user");
    }
    const data = user.toJSON();
    return {
        success: true,
        message: " Password reset  successfully!",
        data,
    };
};
