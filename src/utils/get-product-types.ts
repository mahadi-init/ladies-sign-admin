import { BACKEND_URL } from "@/consts/site-info";

export const getProductTypes = async (): Promise<string[]> => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/product/all/product-types`, {
      next: {
        revalidate: 300,
      },
    });
    const types = await res.json();

    return types.data;
  } catch (err) {
    throw new Error("Failed fetching product types");
  }
};
