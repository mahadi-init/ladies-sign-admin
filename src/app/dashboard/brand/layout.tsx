import { brandColumn } from "@/columns/BrandColumn";
import PageTop from "@/components/native/PageTop";
import TableUIWrapper from "@/ui/TableUIWrapper";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageTop title="Brands" />
      <div className="flex flex-col xl:flex-row justify-between gap-4 ">
        {children}
        <TableUIWrapper route="/brand" columns={brandColumn} />
      </div>
    </>
  );
}
