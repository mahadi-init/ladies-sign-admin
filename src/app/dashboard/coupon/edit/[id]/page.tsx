import getData from "@/actions/get";
import { patchData } from "@/actions/patch";
import { BACKEND_URL } from "@/site-info";
import { CouponType } from "@/types/coupon.t";
import { getAllProductTypes } from "@/utils/get-product-types";
import CouponUI from "../../CouponUI";

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
    await getAllProductTypes(),
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
