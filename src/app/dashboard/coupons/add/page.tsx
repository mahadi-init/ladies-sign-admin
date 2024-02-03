import { addData } from "@/actions/post";
import { getProductTypes } from "@/utils/get-product-types";
import SharedCouponUI from "../ui";
import { BACKEND_URL } from "@/consts/site-info";

export default async function AddCategory() {
  const productTypes = await getProductTypes();

  return (
    <SharedCouponUI
      productTypes={productTypes}
      queryUrl={`${BACKEND_URL}/api/coupon/add`}
      validationTag="coupon"
      successMessage="Coupon added successfully"
      serverAction={addData}
    />
  );
}
