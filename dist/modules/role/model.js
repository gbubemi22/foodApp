import mongoose from "mongoose";
const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
    collection: "Roles",
    collation: {
        locale: "en",
        strength: 1,
        caseLevel: true,
        numericOrdering: true,
    },
});
const Role = mongoose.model("Roles", RoleSchema);
export default Role;
