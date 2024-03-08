import getData from "@/actions/get";
import PageTop from "@/components/native/PageTop";
import { CouponType } from "@/shared/coupons/coupon.t";
import { BACKEND_URL } from "../../../../site-info";
import Wrapper from "./Wrapper";

export default async function Coupons() {
  const coupons: CouponType[] = await getData(
    `${BACKEND_URL}/api/coupon`,
    300,
    ["coupon", "coupons"]
  );

  return (
    <>
      <PageTop title="Coupons" />
      <Wrapper coupons={coupons} />
    </>
  );
}
