import { addData } from "@/actions/post";
import { getProductTypes } from "@/utils/get-product-types";
import { BACKEND_URL } from "@/consts/site-info";
import SharedCouponUI from "@/ui/SharedCouponUI";

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
