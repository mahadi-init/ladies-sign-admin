import getData from "@/actions/get";
import { patchData } from "@/actions/patch";
import { BACKEND_URL } from "@/consts/site-info";
import { CouponType } from "@/types/coupon";
import SharedCouponUI from "@/ui/SharedCouponUI";
import { getProductTypes } from "@/utils/get-product-types";

const getCouponData = async (id: string) => {
  const data = await getData<CouponType>(`${BACKEND_URL}/api/coupon/${id}`, 10);
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
    <SharedCouponUI
      {...data[1]}
      productTypes={data[0]}
      queryUrl={`${BACKEND_URL}/api/coupon/${params.id}`}
      validationTag="coupon"
      successMessage="Coupon edited successfully"
      serverAction={patchData}
    />
  );
}
