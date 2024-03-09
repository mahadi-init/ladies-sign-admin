import getData from "@/actions/get";
import { BACKEND_URL } from "../../../site-info";

export async function getAllBrandNames() {
  const data = await getData<string[]>(
    `${BACKEND_URL}/api/brand/all-names`,
    false,
    10,
    ["brands", "brand"]
  );
  return data;
}
