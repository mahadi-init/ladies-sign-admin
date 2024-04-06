import { brandColumn } from "@/columns/BrandColumn";
import PageTop from "@/components/native/PageTop";
import TableUIWrapper from "@/ui/TableUIWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageTop title="Brands" />
      <div className="flex flex-col justify-between gap-4 xl:flex-row ">
        {children}
        <TableUIWrapper route="/brand" columns={brandColumn} />
      </div>
    </>
  );
}
