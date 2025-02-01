import { Types } from "mongoose";
import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../../utils/error.js";
import Vendor from "./model.js";
import { StatusEnum, VendorDataType } from "./type.js";
import { generateOTP, getOtpExpiryTime } from "../../utils/util.js";
import sendEmail from "../../utils/mailtrap.js";
import User from "../user/model.js";
import { hash } from "../../utils/bcryptiUtils.js";
import { createSession, deleteSession } from "../../utils/session.js";

export const create = async (payload: VendorDataType) => {
  const checkUser = await Vendor.findOne({
    $or: [{ phone_number: payload.phoneNumber }, { email: payload.email }],
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

  // TODO: send admin Email

  await Vendor.create(payload);

  return {
    status: true,
    message:
      "Your account is awaiting verification, you will be notified about your status soon.",
    data: [],
  };
};

export const login = async (phoneNumber: string, password: string) => {
  const vendor = await Vendor.findOne({ phoneNumber: phoneNumber }).exec();

  console.log(vendor);

  if (!vendor) throw new UnauthorizedError("Incorrect login details");

  if (!(await vendor.comparePassword(password))) {
    throw new UnauthorizedError("Incorrect login details");
  }

  if (
    vendor.status === StatusEnum.PENDING ||
    vendor.status === StatusEnum.REJECTED
  ) {
    throw new BadRequestError(`Please contact admin`);
  }

  if (vendor.block === true) {
    throw new BadRequestError(
      `Your account has been blocked please contact admin`
    );
  }

  const token = await vendor.generateJWT();

  const sessionPayload = {
    id: vendor.id,
    email: vendor.email,
  };

  console.log("Payload", sessionPayload);

  const sess = await createSession(vendor.id, sessionPayload);
  console.log("SESS", sess);

  return {
    success: true,
    message: `Welcome ${vendor.businessName}`,
    user: {
      id: vendor._id,
      phoneNumber: vendor.phoneNumber,
    },
    token,
  };
};

export const forgetPassword = async (email: string) => {
  const user = await Vendor.findOne({ email });

  if (!user) throw new NotFoundError(`User not found`);

  let otp = generateOTP();
  let otp_expires_at = getOtpExpiryTime();

  console.log(otp);
  await Vendor.findOneAndUpdate(
    {
      email,
    },
    {
      $set: {
        otp: otp,
        expired_at: otp_expires_at,
      },
    },
    {
      new: true,
    }
  );

  await sendEmail(user.email, "Email-Verification", otp);

  return {
    success: true,
    message: " Otp sent  successfully!",
    data: [],
  };
};
export const resetPassword = async (
  email: string,
  password: string,
  otp_token: string
) => {
  const user = await User.findOne({ email });

  if (!user) throw new NotFoundError(`User not found`);

  if (user.otp !== otp_token) {
    throw new BadRequestError(`Invalid OTP`);
  }

  const otpExpiryDuration = getOtpExpiryTime();

  if (Date.now() > otpExpiryDuration.getTime())
    throw new BadRequestError(`Expired OTP`);

  const hashedPassword = await hash(password);

  // Update user with new password and unset OTP fields
  const updatedUser = await User.findOneAndUpdate(
    { email },
    {
      $set: {
        password: hashedPassword,
        isEmailVerified: true,
      },
      $unset: {
        // Use $unset to remove fields
        otp: "",
        expired_at: "",
      },
    },
    { new: true, runValidators: true }
  );

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

export const logout = async (id: string) => {
  await deleteSession(id);

  return {
    status: true,
    message: "User successfully logged out",
    data: {},
  };
};

export const getProfile = async (vendorId: string) => {
  const user = await Vendor.findOne({ _id: vendorId })
    .select("-password")
    .exec();

  console.log(user);

  if (!user) throw new NotFoundError(`Vendor not found`);

  return {
    success: true,
    message: `Password reset successfully your password.`,
    data: user.toJSON(),
  };
};

// export type DecodedUser = {
//   id: Types.ObjectId;
//   email: string;
// };

// export const createVendorSession = async (
//   vendorId: string,
//   payload: DecodedUser
// ) => {
//   const key = `auth:sessions:${vendorId}`;
//   console.log("Creating session with key:", key);

//   const redisInstance = new Redis(redis as unknown as string);

//   // Serialize the payload before storing it
//   const serializedPayload = JSON.stringify(payload);

//   // Set the new session with a duration of 1000 days
//   const durationFor1000Days = 60 * 60 * 24 * 365 * 2.7;
//   console.log("Session duration (seconds):", durationFor1000Days);
//   await redisInstance.setEx(key, serializedPayload, durationFor1000Days);

//   console.log("Session created successfully");
//   return vendorId;
// };

// export const getVendorSession = async (vendorId: string) => {
//   try {
//     const key = `auth:sessions:${vendorId}`;

//     const redisInstance = new Redis(redis as unknown as string);

//     // Retrieve current session if it exists
//     const session = await redisInstance.get(key);

//     if (!session || session === "") return false;

//     return session;
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const deleteSession = async (vendorId: string) => {
//   const key = `auth:sessions:${vendorId}`;
//   const redisInstance = new Redis(redis as unknown as string);

//   await redisInstance.delete(key);

//   return true;
// };
