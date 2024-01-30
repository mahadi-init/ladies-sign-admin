"use server";

import { BACKEND_URL } from "@/consts/site-info";
import { Response } from "@/types/response";
import { revalidatePath } from "next/cache";

export async function addBrand<T>(value: T): Promise<Response> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/brand/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    const data = await res.json();

    if (data.status || data.success) {
      revalidatePath("/dashboard/brand");

      return {
        status: 200,
        message: "Brand created successfully",
      };
    } else {
      return {
        status: 500,
        message: "Failed creating brand",
      };
    }
  } catch (err) {
    return {
      status: 400,
      message: "Something went wrong",
    };
  }
}
