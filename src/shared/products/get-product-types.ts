import getData from "@/actions/get";
import { BACKEND_URL } from "../../../site-info";

export const getProductTypes = async (): Promise<string[]> => {
  const res = await getData<string[]>(
    `${BACKEND_URL}/api/product/all/product-types`,
    10,
    ["types", "type"]
  );
  //@ts-expect-error
  return res.data;
};
