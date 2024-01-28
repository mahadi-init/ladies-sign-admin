"use server";

import { BACKEND_URL } from "@/consts/site-info";
import { Response } from "@/types/response";
import { revalidatePath } from "next/cache";

export const deleteCategory = async (id: string): Promise<Response> => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/category/delete/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.status || data.success) {
      revalidatePath("/dashboard/category");

      return {
        status: 200,
        message: "Category deleted successfully",
      };
    } else {
      return {
        status: 500,
        message: "Failed deleting category",
      };
    }
  } catch (err) {
    return {
      status: 400,
      message: "Something went wrong",
    };
  }
};
