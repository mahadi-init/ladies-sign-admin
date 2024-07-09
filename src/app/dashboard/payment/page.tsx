import PageTop from "@/components/native/PageTop";
import TableUIWrapper from "@/ui/TableUIWrapper";
import { transactionColumn } from "@/columns/TransactionColumn";

export default function Payment() {
  return (
    <div>
      <PageTop title="Payment" />
      <TableUIWrapper route={"/transaction"} columns={transactionColumn} />
    </div>
  );
}
