"use server";

import { BACKEND_URL } from "@/consts/site-info";
import { Response } from "@/types/response";
import { revalidateTag } from "next/cache";

export const deleteAdmin = async (id: string): Promise<Response> => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      revalidateTag("admins");

      return {
        status: 200,
        message: "Admin deleted successfully",
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
