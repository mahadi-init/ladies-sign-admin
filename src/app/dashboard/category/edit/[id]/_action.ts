"use server";

import { BACKEND_URL } from "@/consts/site-info";
import { Response } from "@/types/response";
import { revalidatePath } from "next/cache";

export async function editCategory<T extends { _id?: string }>(
  value: T
): Promise<Response> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/category/edit/${value._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    const data = await res.json();

    if (data.status || data.success) {
      revalidatePath("/dashboard/category");

      return {
        status: 200,
        message: "Category edited successfully",
      };
    } else {
      return {
        status: 500,
        message: "Failed editing category",
      };
    }
  } catch (err) {
    return {
      status: 400,
      message: "Something went wrong",
    };
  }
}
