"use server";

import { BACKEND_URL } from "@/consts/site-info";
import { Response } from "@/types/response";
import { revalidateTag } from "next/cache";

export const deleteCategory = async (id: string): Promise<Response> => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/category/delete/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      revalidateTag("category");

      return {
        status: 200,
        message: "Category deleted successfully",
      };
    }

    throw new Error();
  } catch (err) {
    return {
      status: 400,
      message: "Something went wrong",
    };
  }
};
