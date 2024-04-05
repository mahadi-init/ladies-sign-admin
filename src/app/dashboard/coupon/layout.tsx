import { couponColumn } from "@/columns/CouponColumn";
import PageTop from "@/components/native/PageTop";
import TableUIWrapper from "@/ui/TableUIWrapper";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageTop title="Coupon" />
      <div className="flex flex-col xl:flex-row justify-between gap-4">
        {children}
        <TableUIWrapper route="/coupon" columns={couponColumn} />
      </div>
    </>
  );
}
