"use server";

import { BACKEND_URL } from "@/consts/site-info";
import { Response } from "@/types/response";
import { revalidateTag } from "next/cache";

export async function editBrand<T extends { _id?: string }>(
  value: T,
): Promise<Response> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/brand/edit/${value._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    if (res.ok) {
      revalidateTag("brands");

      return {
        status: 200,
        message: "Brand edited successfully",
      };
    }

    throw new Error();
  } catch (err) {
    return {
      status: 400,
      message: "Something went wrong",
    };
  }
}
