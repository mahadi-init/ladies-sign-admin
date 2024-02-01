"use server";

import { Response } from "@/types/response";
import { revalidateTag } from "next/cache";

export const deleteData = async (
  queryUrl: string,
  tag: string,
  successMessage: string,
): Promise<Response> => {
  try {
    const res = await fetch(queryUrl, {
      method: "DELETE",
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
};
