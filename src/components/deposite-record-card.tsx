import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { TransactionType } from "@/types/transaction.t";
import clsx from "clsx";

export function DepositeRecordCard({
  data,
  index,
}: {
  data: TransactionType;
  index: number;
}) {
  return (
    <Card className="w-full max-w-xl text-sm md:text-lg">
      <CardHeader>
        <CardTitle>Payment Receipt #{index + 1}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 items-center gap-2">
          <div className="text-gray-500 dark:text-gray-400">Date:</div>
          <div>{new Date(data.createdAt).toDateString()}</div>
        </div>
        <div className="grid grid-cols-2 items-center gap-2">
          <div className="text-gray-500 dark:text-gray-400">
            Transaction ID:
          </div>
          <div>{data.paymentID}</div>
        </div>
        <div className="grid grid-cols-2 items-center gap-2">
          <div className="text-gray-500 dark:text-gray-400">Amount:</div>
          <div className="font-semibold">{data.amount}</div>
        </div>
        <div className="grid grid-cols-2 items-center gap-2">
          <div className="text-gray-500 dark:text-gray-400">
            Invoice Number:
          </div>
          <div>{data.merchantInvoiceNumber}</div>
        </div>
        <div className="grid grid-cols-2 items-center gap-2">
          <div className="text-gray-500 dark:text-gray-400">Status:</div>
          <div
            className={clsx(
              "font-semibold",
              data.transactionStatus === "Completed"
                ? "text-green-500"
                : "text-red-500",
            )}
          >
            {data.transactionStatus}
          </div>
        </div>
        <div className="grid grid-cols-2 items-center gap-2">
          <div className="text-gray-500 dark:text-gray-400">Time:</div>
          <div>{new Date(data.createdAt).toLocaleTimeString()}</div>
        </div>
      </CardContent>
    </Card>
  );
}
