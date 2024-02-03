"use server";

import { Response } from "@/types/response";
import { revalidateTag } from "next/cache";

/**
 * Sends a POST request to the specified URL with the provided data.
 * @template T - The type of the data being sent.
 * @param {T} data - The data to be sent in the request body.
 * @param {string} queryUrl - The URL to send the request to.
 * @param {string} validationTag - The validation tag to be revalidated if the request is successful.
 * @param {string} successMessage - The success message to be returned if the request is successful.
 * @returns {Promise<Response>} - A promise that resolves to a Response object.
 */
export async function addData<T>(
  data: T,
  queryUrl: string,
  validationTag: string,
  successMessage: string
): Promise<Response> {
  try {
    const res = await fetch(queryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    if (res.ok) {
      revalidateTag(validationTag);

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
