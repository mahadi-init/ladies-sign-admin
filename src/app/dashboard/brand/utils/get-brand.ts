import { BACKEND_URL } from "@/consts/site-info";

export const getBrands = async () => {
  const res = await fetch(`${BACKEND_URL}/api/brand/all`);

  const data = await res.json();

  console.log(data);

  return data.result;
};
