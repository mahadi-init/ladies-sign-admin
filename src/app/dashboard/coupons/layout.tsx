import getData from "@/actions/get";
import PageTop from "@/components/native/PageTop";
import { BACKEND_URL } from "@/site-info";
import { CouponType } from "@/types/coupon.t";
import Wrapper from "./Wrapper";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const coupons: CouponType[] = await getData(
    `${BACKEND_URL}/api/coupon`,
    true,
    300,
    ["coupon", "coupons"]
  );

  return (
    <>
      <PageTop title="Coupons" />
      <div className="flex flex-col xl:flex-row justify-between gap-4 ">
        {children}
        <Wrapper coupons={coupons} />
      </div>
    </>
  );
}
