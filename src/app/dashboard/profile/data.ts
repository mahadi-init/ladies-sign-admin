import { connectDB } from "@/db/connect";
import { AdminModel } from "@/models/admin.model";
import { cache } from "react";

export const getAdminData = cache(async (_id?: string) => {
  connectDB()

  const admin = await AdminModel.findById(_id);
  return JSON.stringify(admin);
})
