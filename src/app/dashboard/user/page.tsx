import { userColumn } from "@/columns/UserColumn";
import PageTop from "@/components/native/PageTop";
import TableUIWrapper from "@/ui/TableUIWrapper";

export default async function Users() {
  return (
    <>
      <PageTop title="Users" />
      <TableUIWrapper columns={userColumn} route="/user" />
    </>
  );
}
