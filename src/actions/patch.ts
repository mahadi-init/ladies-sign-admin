"use server";
import { Response } from "@/types/response";
import { revalidateTag } from "next/cache";

/**
 * Sends a PATCH request to the specified URL with the provided data.
 * @template T - The type of the data being sent.
 * @param {T} data - The data to be sent in the request body.
 * @param {string} queryUrl - The URL to send the request to.
 * @param {string} validationTag - The validation tag to be revalidated if the request is successful.
 * @param {string} successMessage - The success message to be returned if the request is successful.
 * @returns {Promise<Response>} - A promise that resolves to the response of the request.
 */
export async function patchData<T>(
  data: T,
  queryUrl: string,
  validationTag: string,
  successMessage: string
): Promise<Response> {
  try {
    const res = await fetch(queryUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

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
