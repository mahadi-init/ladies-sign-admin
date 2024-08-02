"use server";

import { ProductModel } from "@/models/product.model";
import { ProductType } from "@/types/product";
import { Response } from "@/types/response";
import { revalidatePath } from "next/cache";

export async function create<T>(data: ProductType): Promise<Response<T>> {
  try {
    await ProductModel.create(data);
    revalidatePath("/dashboard/product");

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
  data: ProductType,
): Promise<Response<T>> {
  try {
    await ProductModel.findByIdAndUpdate(_id, data);
    revalidatePath("/dashboard/product");

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
    await ProductModel.findByIdAndDelete(_id);
    revalidatePath("/dashboard/product");

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