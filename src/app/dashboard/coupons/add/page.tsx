import SharedCouponUI from "../_shared/ui";
import { addCategory } from "./_action";
import { getProductTypes } from "@/utils/get-product-types";

export default async function AddCategory() {
  const productTypes = await getProductTypes();

  return (
    <SharedCouponUI productTypes={productTypes} serverAction={addCategory} />
  );
}
