"use server";

import { Response } from "@/types/response";

export async function editCategory<T>(data: T): Promise<Response> {
  return {
    status: 200,
    message: "Category edited successfully",
  };
}
