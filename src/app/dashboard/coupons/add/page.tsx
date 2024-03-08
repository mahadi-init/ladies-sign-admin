import { addData } from "@/actions/post";
import CouponUI from "@/shared/coupons/CouponUI";
import { getProductTypes } from "@/shared/products/get-product-types";
import { BACKEND_URL } from "../../../../../site-info";

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
