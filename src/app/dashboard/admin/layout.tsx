import { adminColumn } from "@/columns/AdminColumn";
import PageTop from "@/components/native/PageTop";
import TableUIWrapper from "@/ui/TableUIWrapper";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageTop title="Admins" />
      <div className="flex flex-col justify-between gap-4 xl:flex-row">
        {children}
        <TableUIWrapper route="/admin" columns={adminColumn} />
      </div>
    </>
  );
}
