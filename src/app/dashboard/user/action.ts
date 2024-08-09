"use server";

import { connectDB } from "@/db/connect";
import { UserModel } from "@/models/user.model";
import { Response } from "@/types/response";
import { UserType } from "@/types/user";
import { revalidatePath } from "next/cache";

export async function create<T>(data: UserType): Promise<Response<T>> {
  connectDB()
  try {
    const sameNumbers = await UserModel.find({
      phone: data.phone,
    });

    if (sameNumbers.length > 0) {
      throw new Error("phone number already exists");
    }

    await UserModel.create(data);
    revalidatePath("/dashboard/user");

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
  data: UserType,
): Promise<Response<T>> {
  connectDB()
  try {
    await UserModel.findByIdAndUpdate(_id, data);
    revalidatePath("/dashboard/user");

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
    await UserModel.findByIdAndDelete(_id);
    revalidatePath("/dashboard/user");

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
