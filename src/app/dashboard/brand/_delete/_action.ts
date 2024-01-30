"use server";

import { BACKEND_URL } from "@/consts/site-info";
import { Response } from "@/types/response";
import { revalidatePath } from "next/cache";

export const deleteBrand = async (id: string): Promise<Response> => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/brand/delete/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.status || data.success) {
      revalidatePath("/dashboard/brand");

      return {
        status: 200,
        message: "Brand deleted successfully",
      };
    } else {
      return {
        status: 500,
        message: "Failed deleting brand",
      };
    }
  } catch (err) {
    return {
      status: 400,
      message: "Something went wrong",
    };
  }
};
