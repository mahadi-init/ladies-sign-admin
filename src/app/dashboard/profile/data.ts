import { AdminModel } from "@/models/admin.model";

export async function getAdminData(_id?: string) {
  const admin = await AdminModel.findById(_id);
  return JSON.stringify(admin);
}
