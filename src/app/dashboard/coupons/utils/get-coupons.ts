import { BACKEND_URL } from "@/consts/site-info";

export const getCoupons = async () => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/coupon`, {
      next: {
        tags: ["coupon", "coupons"],
        revalidate: 300,
      },
    });
    const data = await res.json();

    return data;
  } catch (err) {
    throw new Error("Failed fetching coupons");
  }
};
