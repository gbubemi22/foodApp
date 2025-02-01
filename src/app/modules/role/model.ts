import mongoose from "mongoose";

export type RoleDocument = {
  name: string;
};

const RoleSchema = new mongoose.Schema<RoleDocument>(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "Roles",
    collation: {
      locale: "en",
      strength: 1,
      caseLevel: true,
      numericOrdering: true,
    },
  },
);

const Role = mongoose.model<RoleDocument>("Roles", RoleSchema);

export default Role;
