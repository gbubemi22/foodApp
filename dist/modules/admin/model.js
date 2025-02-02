import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export var Role;
(function (Role) {
    Role["SUPER_ADMIN"] = "SUPER-ADMIN";
    Role["ADMIN"] = "ADMIN";
    Role["SUPPORT"] = "SUPPORT";
})(Role || (Role = {}));
const AdminSchema = new mongoose.Schema({
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
}, {
    timestamps: true,
    collection: "Admin",
    collation: {
        locale: "en",
        strength: 1,
        caseLevel: true,
        numericOrdering: true,
    },
});
AdminSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    const salt = await bcrypt.genSalt(9);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
AdminSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};
AdminSchema.methods.generateJWT = function () {
    const token = jwt.sign({
        id: this._id,
        email: this.email,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_TOKEN_VALIDITY });
    return token;
};
const Admin = mongoose.model("Admin", AdminSchema);
export default Admin;
