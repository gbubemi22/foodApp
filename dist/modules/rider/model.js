import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const RiderSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
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
    phoneNumber: {
        type: String,
        required: false,
    },
    otp: {
        type: String,
        required: false,
    },
    expired_at: {
        type: Date,
        required: false,
    },
    verifiedEmail: {
        type: Boolean,
        default: false,
    },
    verifiedPhoneNumber: {
        type: Boolean,
        default: false,
    },
    status: {
        type: Boolean,
        default: false,
    },
    image: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    location: {
        latitude: Number,
        longitude: Number,
    },
    isAvailable: {
        type: String,
        enum: ["available", "unavailable"],
        default: "available",
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
}, {
    timestamps: true,
    collection: "Rider",
    collation: {
        locale: "en",
        strength: 1,
        caseLevel: true,
        numericOrdering: true,
    },
});
RiderSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    const salt = await bcrypt.genSalt(9);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
RiderSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};
RiderSchema.methods.generateJWT = function () {
    const expiresIn = process.env.JWT_TOKEN_VALIDITY;
    const token = jwt.sign({
        id: this._id,
        email: this.email,
        //role: this.roleId.name
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expiresIn });
    return token;
};
const Rider = mongoose.model("Rider", RiderSchema);
export default Rider;
