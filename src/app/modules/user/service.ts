import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  UnauthorizedError,
} from "../../utils/error.js";
import User from "./model.js";
import { UserDataType } from "./type.js";
import { generateOTP, getOtpExpiryTime } from "../../utils/util.js";
import sendEmail from "../../utils/mailtrap.js";
import { compare, hash } from "../../utils/bcryptiUtils.js";
import { createSession, deleteSession } from "../../utils/session.js";

export const create = async (payload: UserDataType) => {
  const checkUser = await User.findOne({
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

  const otp = generateOTP();
  const expired_at = getOtpExpiryTime();

  console.log(otp);

  payload.otp = otp;
  payload.expired_at = expired_at;

  const user = await User.create({
    ...payload,
  });

  await sendEmail(user.email, "Email Verification", otp);

  return {
    status: true,
    message: "Success! Please verify your email",
    data: {
      id: user._id,
      email: user.email,
      phoneNumber: user.phoneNumber,
      firstName: user.firstName,
      lastName: user.lastName,
    },
  };
};

export const login = async (
  phoneNumber: string,
  email: string,
  password: string
) => {
  const user = await User.findOne({
    $or: [{ phoneNumber: phoneNumber }, { email: email }],
  }).exec();

  console.log(user);

  if (!user) throw new UnauthorizedError("Incorrect login details");

  if (!(await user.comparePassword(password))) {
    throw new UnauthorizedError("Incorrect login details");
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

export const verifyEmail = async (email: string, otp_token: string) => {
  const user = await User.findOne({ email: email });

  if (!user) throw new NotFoundError(`user with ${email}: not found`);

  if (user.otp !== otp_token) {
    throw new BadRequestError(`No OTP found for the user`);
  }

  const otpExpiryDuration = user.expired_at;

  if (Date.now() > otpExpiryDuration.getTime())
    throw new BadRequestError(`Expired OTP`);

  const updatedUser = await User.findOneAndUpdate(
    { email },
    {
      $set: {
        verifiedEmail: true,
      },
      $unset: {
        otp: "",
        expired_at: "",
      },
    },
    { new: true }
  );

  if (!updatedUser) {
    throw new BadRequestError("Failed to update user");
  }

  const token = await user.generateJWT();

  return {
    success: true,
    data: [user, token],
    message: "Email Verified successful",
  };
};

export const sendOtpToMail = async (email: string) => {
  const user = await User.findOne({ email: email });

  if (!user) throw new NotFoundError(`User not found`);
  const otp = generateOTP();
  const expired_at = getOtpExpiryTime();

  await User.findOneAndUpdate(
    { email: user.email },
    { otp: otp, expired_at: expired_at }
  );

  //send otp to mail

  await sendEmail(user.email, "Email-Verification", otp);

  return {
    success: true,
    message: " Otp sent  successfully!",
    data: [],
  };
};

export const forgetPassword = async (email: string) => {
  const user = await User.findOne({ email });

  if (!user) throw new NotFoundError(`User not found`);

  let otp = generateOTP();
  let otp_expires_at = getOtpExpiryTime();

  console.log(otp);
  await User.findOneAndUpdate(
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

export const getProfile = async (userId: string) => {
  const user = await User.findById(userId).select("-password");

  if (!user) throw new NotFoundError(`User not found`);

  return {
    success: true,
    message: `Password reset successfully your password.`,
    data: user.toJSON(),
  };
};

export const updateUserProfile = async (
  userId: string,
  firstName?: string,
  phoneNumber?: string,
  email?: string,
  lastName?: string,
) => {
  // Find the user by ID
  const user = await User.findById(userId);

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

export const uploadImage = async (userId: string, image: any) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new NotFoundError(`User not found`);
  }

  await User.findByIdAndUpdate({ _id: userId }, { $set: { image: image } });

  return {
    status: true,
    message: `Image Uploaded successfully`,
    data: [],
  };
};

// export type DecodedUser = {
//   userId: Types.ObjectId;
//   email: string;
//   phoneNumber: string;
//   fullName: string;
// };

// export const createSession = async (userId: string, payload: DecodedUser) => {
//   const key = `auth:sessions:${userId}`;

//   try {
//     const redisInstance = new Redis(redis as unknown as string);

//     // Retrieve current session if it exists
//     const currentSession = await redisInstance.get(key);

//     // If a session exists, delete it
//     if (currentSession) {
//       await redisInstance.delete(key);
//     }

//     // Set the new session with a duration of 30 minutes (60 seconds * 30)
//     const duration = 60 * 30;

//     const durationFor7Days = duration * 24 * 7;

//     // Duration for 1000 days (in minutes)
//     const durationFor1000Days = duration * 24 * 1000;

//     await redisInstance.setEx(key, payload, durationFor1000Days);

//     return userId;
//   } catch (error) {
//     console.error("Error creating session:", (error as Error).message);
//     throw new BadRequestError(`Error creating session`);
//   }
// };

// export const getSession = async (userId: string) => {
//   const key = `auth:sessions:${userId}`;

//   const redisInstance = new Redis(redis as unknown as string);

//   // Retrieve current session if it exists
//   const session = await redisInstance.get(key);

//   if (!session || session === "") return false;

//   return session;
// };

// export const deleteSession = async (insuredId: string) => {
//   const key = `auth:sessions:${insuredId}`;
//   const redisInstance = new Redis(redis as unknown as string);

//   await redisInstance.delete(key);

//   return true;
// };
