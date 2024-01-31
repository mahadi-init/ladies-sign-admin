"use server";

import { BACKEND_URL } from "@/consts/site-info";
import { Response } from "@/types/response";
import { revalidateTag } from "next/cache";

export const deleteBrand = async (id: string): Promise<Response> => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/brand/delete/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      revalidateTag("brands");

      return {
        status: 200,
        message: "Brand deleted successfully",
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
