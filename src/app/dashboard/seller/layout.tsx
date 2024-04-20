import { sellerColumn } from "@/columns/SellerColumn";
import PageTop from "@/components/native/PageTop";
import TableUIWrapper from "@/ui/TableUIWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageTop title="Seller" />
      <div className="flex flex-col justify-between gap-4 xl:flex-row">
        {children}
        <TableUIWrapper route="/seller" columns={sellerColumn} />
      </div>
    </>
  );
}
