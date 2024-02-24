import {
  STEADFAST_API_KEY,
  STEADFAST_BASE_URL,
  STEADFAST_SECRECT_KEY,
} from "@/consts/site-info";

export const getSteadFastBalance = async (): Promise<{
  current_balance: number;
}> => {
  const res = await fetch(`${STEADFAST_BASE_URL}/api/v1/get_balance`, {
    next: {
      revalidate: 10,
      tags: ["orders", "order"],
    },
    headers: {
      "Content-Type": "application/json",
      "Api-Key": STEADFAST_API_KEY,
      "Secret-Key": STEADFAST_SECRECT_KEY,
    },
  });

  const data = await res.json();

  return data;
};
