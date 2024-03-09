import getData from "@/actions/get";
import { patchData } from "@/actions/patch";
import CouponUI from "@/shared/coupons/CouponUI";
import { CouponType } from "@/shared/coupons/coupon.t";
import { getProductTypes } from "@/shared/products/get-product-types";
import { BACKEND_URL } from "../../../../../../site-info";

const getCouponData = async (id: string) => {
  const data = await getData<CouponType>(
    `${BACKEND_URL}/api/coupon/${id}`,
    true
  );
  return data;
};

export default async function EditCoupon({
  params,
}: {
  params: { id: string };
}) {
  const data = await Promise.all([
    await getProductTypes(),
    await getCouponData(params.id),
  ]);

  return (
    <CouponUI
      {...data[1]}
      productTypes={data[0]}
      queryUrl={`${BACKEND_URL}/api/coupon/${params.id}`}
      validationTag="coupon"
      successMessage="Coupon edited successfully"
      serverAction={patchData}
    />
  );
}
