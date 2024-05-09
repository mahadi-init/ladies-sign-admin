import { orderColumn } from "@/columns/OrderColumn";
import PageTop from "@/components/native/PageTop";
import TableUIWrapper from "@/ui/TableUIWrapper";
import { getAuthId } from "@/utils/get-auth-info";

export default async function Orders() {
  const sellerId = await getAuthId();

  return (
    <>
      <PageTop title="Orders" />
      {/* FIXME: Implement this NOTE: Use sellerId and backend */}
      {/*     <TableUIWrapper route="/seller" columns={orderColumn} /> */}
    </>
  );
}