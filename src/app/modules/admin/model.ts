import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export type AdminDocument = mongoose.Document & {
  fullName: string;
  email: string;
  password: string;
  role: string;
  otp: string;
  expired_at: Date;

  lastLoginDevice: {
    userAgent: String;
    appVersion: String;
    platform: String;
    platformVersion: String;
    device: String;
    notificationToken: String;
    expoPushNotificationToken: String;
    devicePushNotificationToken: String;
  };

  comparePassword(candidatePassword: string): Promise<boolean>;
  generateJWT(): Promise<string>;
};

export enum Role {
  SUPER_ADMIN = "SUPER-ADMIN",
  ADMIN = "ADMIN",
  SUPPORT = "SUPPORT",
}

const AdminSchema = new mongoose.Schema<AdminDocument>(
  {
    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      lowercase: true,
      unique: true,
      trim: true,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.ADMIN,
    },

    otp: {
     type: String,
     required: false,
   },
   expired_at: {
     type: Date,
     required: false,
   },
  },
  {
    timestamps: true,
    collection: "Admin",
    collation: {
      locale: "en",
      strength: 1,
      caseLevel: true,
      numericOrdering: true,
    },
  }
);

AdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(9);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

AdminSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

AdminSchema.methods.generateJWT = function () {
  const token = jwt.sign(
    {
      id: this._id,
      email: this.email,
    },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: process.env.JWT_TOKEN_VALIDITY }
  );
  return token;
};

const Admin = mongoose.model<AdminDocument>("Admin", AdminSchema);

export default Admin;

export type AdminDataType = {
  fullName: string;
  email: string;
  password: string;
  role: string;
};
