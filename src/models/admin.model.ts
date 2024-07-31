import { AdminType } from "@/types/admin";
import { model, Model, models, Schema } from "mongoose";

const adminSchema = new Schema<AdminType>(
  {
    name: String,
    password: String,
    email: String,
    phone: String,
    img: String,
    role: {
      type: String,
      deafult: "SUPERADMIN",
    },
  },
  {
    timestamps: true,
  },
);

export const AdminModel: Model<AdminType> =
  models?.Admin || model("Admin", adminSchema);
