"use server";

import { BACKEND_URL } from "@/consts/site-info";
import { revalidatePath } from "next/cache";

export const getImageUrl = async (formData: FormData) => {
  const image = formData.get("image");
  const imageData = new FormData();

  if (image) {
    imageData.append("image", image);
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/cloudinary/add-img`, {
      method: "POST",
      body: imageData,
    });

    return await res.json();
  } catch (err) {
    throw new Error("Image upload Failed");
  }
};

export async function editCategory<T>(data: T) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/category/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    revalidatePath("/dashboard/category");
    return await res.json();
  } catch (err) {
    throw new Error("Something went wrong");
  }
}
