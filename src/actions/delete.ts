"use server";

import { Response } from "@/types/response";
import { revalidateTag } from "next/cache";

/**
 * Deletes data from the specified URL.
 * @param {string} queryUrl - The URL to send the DELETE request to.
 * @param {string} validationTag - The validation tag to revalidate if the request is successful.
 * @param {string} successMessage - The success message to return if the request is successful.
 * @returns {Promise<Response>} - A promise that resolves to the response object.
 */
export const deleteData = async (
  queryUrl: string,
  validationTag: string,
  successMessage: string
): Promise<Response> => {
  try {
    const res = await fetch(queryUrl, {
      method: "DELETE",
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
};
