import PageTop from "@/components/native/PageTop";
import TableUIWrapper from "@/ui/TableUIWrapper";
import { transactionPagination } from "./data";
import { transactionColumn } from "./column";
import TransactionUIWrapper from "./table";

export default async function Transaction({
  searchParams,
}: {
  searchParams: {
    filterBy: "default" | "search";
    index: number;
    limit: number;
    q: string;
    type: "DEPOSIT" | "PAYMENT"
  };
}) {
  const res = await transactionPagination(
    searchParams.filterBy,
    searchParams.index,
    searchParams.limit,
    searchParams.q,
    searchParams.type
  );
  const parsed = JSON.parse(res);


  return (
    <div>
      <PageTop title="Transaction" />
      <TransactionUIWrapper columns={transactionColumn} data={parsed.data} totalPages={parsed.totalPages} />
    </div>
  );
}
