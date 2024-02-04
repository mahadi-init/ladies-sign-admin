import getData from "@/actions/get";
import { patchData } from "@/actions/patch";
import { BACKEND_URL } from "@/consts/site-info";
import { CouponType } from "@/types/coupon";
import SharedCouponUI from "@/ui/SharedCouponUI";
import { getProductTypes } from "@/utils/get-product-types";

export default async function EditCoupon({
  params,
}: {
  params: { id: string };
}) {
  const productTypes = await getProductTypes();
  const data = await getData<CouponType>(
    `${BACKEND_URL}/api/coupon/${params.id}`,
    10,
  );

  return (
    <SharedCouponUI
      {...data}
      productTypes={productTypes}
      queryUrl={`${BACKEND_URL}/api/coupon/${params.id}`}
      validationTag="coupon"
      successMessage="Coupon edited successfully"
      serverAction={patchData}
    />
  );
}
