import { BACKEND_URL } from "@/consts/site-info";

export const getCategories = async () => {
  const res = await fetch(`${BACKEND_URL}/api/category/all`);

  const data = await res.json();
  return data.result;
};
