import { site } from "@/site-config";

export const getSteadFastBalance = async (): Promise<{
  current_balance: number;
}> => {
  const res = await fetch(`${site.STEADFAST_BASE_URL}/api/v1/get_balance`, {
    headers: {
      "Content-Type": "application/json",
      "Api-Key": site.STEADFAST_API_KEY,
      "Secret-Key": site.STEADFAST_SECRECT_KEY,
    },
  });

  const data = await res.json();
  return data;
};
