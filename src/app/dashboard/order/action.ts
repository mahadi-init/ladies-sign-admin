"use server";

import { connectDB } from "@/db/connect";
import { OrderModel } from "@/models/order.model";
import { revalidatePath } from "next/cache";

export const changeConfirmation = async (
  id?: string,
  confirm?: "NO" | "HOLD" | "OK",
) => {
  connectDB();

  try {
    if (confirm === "NO") {
      await OrderModel.findByIdAndUpdate(id, { confirm: "HOLD" });
    } else if (confirm === "HOLD") {
      await OrderModel.findByIdAndUpdate(id, { confirm: "OK" });
    } else {
      await OrderModel.findByIdAndUpdate(id, { confirm: "NO" });
    }

    revalidatePath("/dashboard/order");

    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      message: "Update failed",
    };
  }
};

export const changeStatus = async (id?: string, status?: string) => {
  try {
    connectDB();

    await OrderModel.findByIdAndUpdate(id, { status: status });
    revalidatePath("/dashboard/order");

    return {
      success: true,
    };
  } catch (err) {
    return {
      success: false,
      message: "Update failed",
    };
  }
};
