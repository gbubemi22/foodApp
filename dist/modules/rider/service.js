import { createSession, deleteSession } from "../../utils/session.js";
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError, } from "../../utils/error.js";
import Rider from "./model.js";
import sendEmail from "../../utils/mailtrap.js";
import { generateOTP, getOtpExpiryTime } from "../../utils/util.js";
import { hash } from "../../utils/bcryptiUtils.js";
export const create = async (payload) => {
    const checkUser = await Rider.findOne({
        $or: [{ phoneNumber: payload.phoneNumber }, { email: payload.email }],
    });
    if (checkUser) {
        // Determine which field is duplicated and throw a ConflictError
        if (checkUser.phoneNumber === payload.phoneNumber) {
            throw new ConflictError(`Phone number already in use`);
        }
        if (checkUser.email === payload.email) {
            throw new ConflictError(`Email already in use`);
        }
    }
    const rider = await Rider.create({
        ...payload,
    });
    return {
        status: true,
        message: "Success! Please verify your email",
        data: {
            id: rider._id,
            email: rider.email,
            phoneNumber: rider.phoneNumber,
            firstName: rider.firstName,
            lastName: rider.lastName,
        },
    };
};
export const login = async (phoneNumber, email, password, deviceType, deviceName, deviceToken) => {
    const user = await Rider.findOne({
        $or: [{ phoneNumber: phoneNumber }, { email: email }],
    }).exec();
    console.log(user);
    if (!user)
        throw new UnauthorizedError("Incorrect login details");
    if (!(await user.comparePassword(password))) {
        throw new UnauthorizedError("Incorrect login details");
    }
    if (user.status === false) {
        throw new BadRequestError(`Your account has not been verified contact admin`);
    }
    if (user.deviceType !== deviceType ||
        user.deviceToken !== deviceToken ||
        user.deviceName !== deviceName) {
        await Rider.findOneAndUpdate({ _id: user.id }, {
            $set: {
                deviceType: deviceType,
                deviceToken: deviceToken,
                deviceName: deviceName,
            },
        });
    }
    const token = await user.generateJWT();
    const sessionPayload = {
        id: user.id,
        email: user.email,
        phoneNumber: user.phoneNumber,
    };
    const sess = await createSession(user.id, sessionPayload);
    console.log(sess);
    return {
        success: true,
        message: `Welcome ${user.firstName}`,
        user: {
            id: user._id,
            email: user.email,
            phoneNumber: user.phoneNumber,
            firstName: user.firstName,
            lastName: user.lastName,
        },
        token,
    };
};
export const sendOtpToMail = async (email) => {
    const user = await Rider.findOne({ email: email });
    if (!user)
        throw new NotFoundError(`User not found`);
    const otp = generateOTP();
    const expired_at = getOtpExpiryTime();
    await Rider.findOneAndUpdate({ email: user.email }, { otp: otp, expired_at: expired_at });
    //send otp to mail
    await sendEmail(user.email, "Email-Verification", otp);
    return {
        success: true,
        message: " Otp sent  successfully!",
        data: [],
    };
};
export const forgetPassword = async (email) => {
    const user = await Rider.findOne({ email });
    if (!user)
        throw new NotFoundError(`User not found`);
    let otp = generateOTP();
    let otp_expires_at = getOtpExpiryTime();
    console.log(otp);
    await Rider.findOneAndUpdate({
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
    const user = await Rider.findOne({ email });
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
    const updatedUser = await Rider.findOneAndUpdate({ email }, {
        $set: {
            password: hashedPassword,
            isEmailVerified: true,
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
export const logout = async (id) => {
    await deleteSession(id);
    return {
        status: true,
        message: "User successfully logged out",
        data: {},
    };
};
export const getProfile = async (riderId) => {
    const user = await Rider.findById(riderId).select("-password");
    if (!user)
        throw new NotFoundError(`User not found`);
    return {
        success: true,
        message: `Password reset successfully your password.`,
        data: user.toJSON(),
    };
};
export const updateUserProfile = async (riderId, firstName, phoneNumber, email, lastName) => {
    // Find the user by ID
    const user = await Rider.findById(riderId);
    if (!user) {
        throw new NotFoundError(`User not found`);
    }
    // Update the user's profile fields
    if (firstName) {
        user.firstName = firstName;
    }
    if (lastName) {
        user.lastName = lastName;
    }
    if (phoneNumber) {
        user.phoneNumber = phoneNumber;
    }
    if (email) {
        user.email = email;
    }
    // Save the updated user
    const updatedUser = await user.save();
    return {
        success: true,
        message: `User profile updated successfully.`,
        data: updatedUser.toJSON(),
    };
};
export const uploadImage = async (riderId, image) => {
    const user = await Rider.findById(riderId);
    if (!user) {
        throw new NotFoundError(`User not found`);
    }
    await Rider.findByIdAndUpdate({ _id: riderId }, { $set: { image: image } });
    return {
        status: true,
        message: `Image Uploaded successfully`,
        data: [],
    };
};
export const changePassword = async (riderId, currentPassword, newPassword) => {
    const rider = await Rider.findById(riderId);
    if (!rider)
        throw new NotFoundError(`User not found`);
    const comparePassword = await rider.comparePassword(currentPassword);
    if (!comparePassword)
        throw new BadRequestError(`Incorrect password`);
    const hashedPassword = await hash(newPassword);
    await Rider.findOneAndUpdate({ _id: riderId }, { $set: { password: hashedPassword } }, { new: true, runValidators: true });
    return {
        success: true,
        message: "Email Verified successful",
        data: [],
    };
};
export const myLocation = async (riderId, newLocation) => {
    const rider = await Rider.findById(riderId);
    if (!rider)
        throw new NotFoundError(`User not found`);
    await Rider.findOneAndUpdate({ _id: riderId }, { $set: { location: newLocation } });
    return {
        status: true,
        message: `Location updated successfully`,
        data: [],
    };
};
