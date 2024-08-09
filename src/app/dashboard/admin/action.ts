"use server";

import { connectDB } from "@/db/connect";
import { AdminModel } from "@/models/admin.model";
import { AdminType } from "@/types/admin";
import { Response } from "@/types/response";
import { revalidatePath } from "next/cache";

export async function create<T>(data: AdminType): Promise<Response<T>> {
  connectDB()
  try {
    const sameNumbers = await AdminModel.find({
      phone: data.phone,
    });

    if (sameNumbers.length > 0) {
      throw new Error("phone number already exists");
    }

    await AdminModel.create(data);
    revalidatePath("/dashboard/admin");

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

export async function update<T>(
  _id: string,
  data: AdminType,
): Promise<Response<T>> {
  connectDB()
  try {
    await AdminModel.findByIdAndUpdate(_id, data);
    revalidatePath("/dashboard/admin");

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: "Update Failed",
    };
  }
}

export async function remove<T>(_id?: string): Promise<Response<T>> {
  connectDB()
  try {
    await AdminModel.findByIdAndDelete(_id);
    revalidatePath("/dashboard/admin");

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
