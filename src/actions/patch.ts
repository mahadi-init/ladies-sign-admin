"use server";
import { LocalResponse } from "@/types/response.t";
import { revalidateTag } from "next/cache";

export async function patchData<T>(
  data: T,
  queryUrl: string,
  validationTag: string,
  successMessage: string
): Promise<LocalResponse> {
  try {
    const res = await fetch(queryUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    //FIXME: REMOVE TEST
    const test = await res.json();
    console.log(test);

    if (res.ok) {
      revalidateTag(validationTag);

      return {
        status: 200,
        message: successMessage,
      };
    } else {
      const { message } = await res.json();

      if (!message) {
        throw new Error();
      }

      return {
        status: 400,
        message: message,
      };
    }
  } catch (err) {
    return {
      status: 400,
      message: "Something went wrong",
    };
  }
}
