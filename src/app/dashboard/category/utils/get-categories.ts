import { BACKEND_URL } from "@/consts/site-info";

export const getCategories = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/category/all`, {
      next: {
        tags: ["category", "categories"],
        revalidate: 300,
      },
    });

    const data = await res.json();
    return data.result;
  } catch (err) {
    throw new Error("Failed fetching categories");
  }
};
