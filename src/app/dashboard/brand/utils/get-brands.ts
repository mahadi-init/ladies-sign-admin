import { BACKEND_URL } from "@/consts/site-info";

export const getBrands = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/brand/all`, {
      next: { tags: ["brand", "brands"], revalidate: 300 },
    });

    const data = await res.json();
    return data.result;
  } catch (err) {
    throw new Error("Failed fetching brands");
  }
};
