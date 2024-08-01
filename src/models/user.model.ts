import { UserType } from "@/types/user";
import mongoose, { Model, models } from "mongoose";

const userSchema = new mongoose.Schema<UserType>(
  {
    name: {
      type: String,
      required: true,
    },
    email: String,
    phone: {
      type: String,
      required: true,
    },
    address: String,
  },
  {
    timestamps: true,
  },
);

export const UserModel: Model<UserType> =
  models?.User || mongoose.model("User", userSchema);
