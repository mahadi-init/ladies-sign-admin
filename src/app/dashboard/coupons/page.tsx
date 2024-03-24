import { addData } from "@/actions/post";
import { BACKEND_URL } from "@/site-info";
import { getProductTypes } from "@/utils/get-product-types";
import CouponUI from "./CouponUI";

export default async function AddCoupon() {
  const productTypes = await getProductTypes();

  return (
    <CouponUI
      productTypes={productTypes}
      queryUrl={`${BACKEND_URL}/api/coupon/add`}
      validationTag="coupon"
      successMessage="Coupon added successfully"
      serverAction={addData}
    />
  );
}
