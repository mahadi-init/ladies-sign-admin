import { fetcher } from "@/https/get-request";

export const getAllProductTypes = async (): Promise<string[]> => {
  const res = await fetcher<string[]>(`/all/types`);
  return res;
};
