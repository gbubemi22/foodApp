import mongoose from "mongoose";
import dotenv from "dotenv";
import Admin, { Role } from "./model.js";
import { hash } from "../../utils/bcryptiUtils.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);

    console.log("Connected to the database ✅");

    // Check if a super admin already exists
    const existingAdmin = await Admin.findOne({ role: Role.SUPER_ADMIN });
    if (existingAdmin) {
      console.log("Super Admin already exists. No need to seed.");
      return;
    }

    const pass = process.env.DEFAULT_PASSWORD as string;

    const defaultHashedPassword = await hash(pass);

    // Super Admin Data
    const adminData = {
      email: "admin@quickfoodshop.co.uk",
      fullName: "Admin quickfoodshop",
      password: defaultHashedPassword,
      role: Role.SUPER_ADMIN,
    };

    // Create Super Admin
    const result = await Admin.create(adminData);
    console.log(result);
  } catch (error: any) {
    console.error("Error seeding super admin:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seed script
seedAdmin();
