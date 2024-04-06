import { categoryColumn } from "@/columns/CategoryColumn";
import PageTop from "@/components/native/PageTop";
import TableUIWrapper from "@/ui/TableUIWrapper";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageTop title="Category" />
      <div className="flex flex-col justify-between gap-4 xl:flex-row">
        {children}
        <TableUIWrapper route="/category" columns={categoryColumn} />
      </div>
    </>
  );
}
