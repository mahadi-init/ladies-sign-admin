import { connectDB } from "@/db/connect";
import { AdminModel } from "@/models/admin.model";

export async function getAdminData(_id?: string) {
  connectDB()

  const admin = await AdminModel.findById(_id);
  return JSON.stringify(admin);
}
