"use server";

import { connectDB } from "@/db/connect";
import { AdminModel } from "@/models/admin.model";
import { AdminType } from "@/types/admin";
import { Response } from "@/types/response";
import { revalidatePath } from "next/cache";

export async function update<T>(
  data: AdminType | any,
  _id?: string,
): Promise<Response<T>> {
  connectDB()
  try {
    await AdminModel.findByIdAndUpdate(_id, data);
    revalidatePath("/dashboard/profile");

    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
}

export async function remove<T>(_id?: string): Promise<Response<T>> {
  connectDB()
  try {
    await AdminModel.findByIdAndDelete(_id);
    revalidatePath("/dashboard/profile");

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: "Delete failed",
    };
  }
}
