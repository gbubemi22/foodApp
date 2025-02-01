import mongoose from "mongoose";
import { StatusEnum, VendorDocument } from "./type.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const vendorSchema = new mongoose.Schema<VendorDocument>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },

    businessName: {
      type: String,
      required: true,
    },

    businessDescription: {
      type: String,
      required: true,
    },
    businessAddress: {
      type: String,
      required: true,
    },
    location: {
      latitude: { type: Number, required: false },
      longitude: { type: Number, required: false },
    },

    status: {
      type: String,
      enum: Object.values(StatusEnum),
      default: StatusEnum.PENDING,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "vendor",
    },
    block: {
      type: Boolean,
      default: false,
    },
    otp: {
      type: String,
      required: false,
    },
    expired_at: {
      type: Date,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },

    deviceType: {
      type: String,
      default: "",
    },
    deviceToken: {
      type: String,
      default: "",
    },
    deviceName: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    collection: "Vendor",
    collation: {
      locale: "en",
      strength: 1,
      caseLevel: true,
      numericOrdering: true,
    },
  }
);

vendorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(9);
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

vendorSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

vendorSchema.methods.generateJWT = function () {
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

const Vendor = mongoose.model<VendorDocument>("Vendor", vendorSchema);

export default Vendor;
