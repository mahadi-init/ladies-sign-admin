import { BACKEND_URL } from "@/consts/site-info";
import SharedCouponUI from "../../_shared/ui";
import { editCoupon } from "./_action";
import { CouponType } from "../../type";
import { getProductTypes } from "@/utils/get-product-types";

const getCouponData = async (id: string): Promise<CouponType> => {
  const res = await fetch(`${BACKEND_URL}/api/coupon/${id}`, {
    next: {
      revalidate: 10,
    },
  });
  const data = await res.json();

  return data;
};

export default async function EditCoupon({
  params,
}: {
  params: { id: string };
}) {
  const productTypes = await getProductTypes();
  const data = await getCouponData(params.id);

  return (
    <SharedCouponUI
      {...data}
      productTypes={productTypes}
      serverAction={editCoupon}
    />
  );
}
