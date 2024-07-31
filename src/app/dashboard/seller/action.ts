"use server";

import { SellerModel } from "@/models/seller.model";
import { Response } from "@/types/response";
import { SellerType } from "@/types/seller";
import { revalidatePath } from "next/cache";

export async function create<T>(data: SellerType): Promise<Response<T>> {
  try {
    const sameNumbers = await SellerModel.find({
      phone: data.phone,
    });

    if (sameNumbers.length > 0) {
      throw new Error("phone number already exists");
    }

    await SellerModel.create(data);
    revalidatePath("/dashboard/seller");

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
  data: SellerType,
): Promise<Response<T>> {
  try {
    await SellerModel.findByIdAndUpdate(_id, data);
    revalidatePath("/dashboard/seller");

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
  try {
    await SellerModel.findByIdAndDelete(_id);
    revalidatePath("/dashboard/seller");

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

export async function changeStatus(_id?: string) {
  try {
    await SellerModel.findByIdAndUpdate(_id, { approved: true });
    revalidatePath("/dashboard/seller");

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      message: "Update failed",
    };
  }
}
