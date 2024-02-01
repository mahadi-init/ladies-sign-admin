"use server";

import { Response } from "@/types/response";
import { revalidateTag } from "next/cache";

export async function addData<T>(
  data: T,
  queryUrl: string,
  tag: string,
  successMessage: string,
): Promise<Response> {
  try {
    const res = await fetch(queryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      revalidateTag(tag);

      return {
        status: 200,
        message: successMessage,
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
