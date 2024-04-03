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
      <div className="flex flex-col xl:flex-row justify-between gap-4">
        {children}
        <TableUIWrapper route="/category" columns={categoryColumn} />
      </div>
    </>
  );
}
