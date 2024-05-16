"use client";

import PageTop from "@/components/native/PageTop";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { fetcher } from "@/https/get-request";
import { TransactionType, WithdrawType } from "@/types/transaction.t";
import { getClientAuthInfo } from "@/utils/client-auth";
import { useState } from "react";
import useSWR from "swr";

export default function Records() {
  const sellerID = getClientAuthInfo()?.id;
  const [show, setShow] = useState<"Deposit" | "Withdraw">("Deposit");

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <PageTop title="Records" />
        </div>
        <Label className="mt-4 flex items-center gap-4">
          {show === "Deposit" ? "Deposit" : "Withdraw"}
          <Switch
            onCheckedChange={() =>
              setShow(show === "Deposit" ? "Withdraw" : "Deposit")
            }
          />
        </Label>
      </div>

      {show === "Deposit" ? (
        <DepositRecord sellerID={sellerID} />
      ) : (
        <WithdrawRecord sellerID={sellerID} />
      )}
    </div>
  );
}

const DepositRecord = ({ sellerID }: { sellerID?: string }) => {
  const { data } = useSWR<TransactionType[]>(
    `/transaction/all/${sellerID}`,
    fetcher,
  );

  if (data?.length === 0) {
    return <p className="text-red-700">No deposit found</p>;
  }

  return (
    <div className="flex flex-wrap gap-4 justify-around">
      {data?.map((d) => {
        return (
          <Card className="w-[450px]">
            <CardHeader>
              <CardTitle>{new Date(d?.createdAt).toDateString()}</CardTitle>
              <CardDescription>{d.paymentID}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Amount : {d.amount}</p>
              <p>Invoice Number : {d.merchantInvoiceNumber}</p>
              <p>Status : {d.transactionStatus}</p>
              <p>Time : {new Date(d?.createdAt).toLocaleTimeString()}</p>
            </CardContent>
            <CardFooter className="flex justify-between"></CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

const WithdrawRecord = ({ sellerID }: { sellerID?: string }) => {
  const { data } = useSWR<WithdrawType[]>(`/withdraw/all/${sellerID}`, fetcher);

  return <></>;
};
