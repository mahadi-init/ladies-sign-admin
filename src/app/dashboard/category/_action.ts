"use server";

import { BACKEND_URL } from "@/consts/site-info";
import { revalidatePath } from "next/cache";

export const deleteCategory = async (id: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/category/delete/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      revalidatePath("/dashboard/category");
      return await res.json();
    }
  } catch (err) {
    throw err;
  }
};
