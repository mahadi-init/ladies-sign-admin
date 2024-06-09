"use client";

import { DepositeRecordCard } from "@/components/deposite-record-card";
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
import { useState } from "react";
import useSWR from "swr";

export default function ShowRecords({ sellerID }: { sellerID?: string }) {
  const [show, setShow] = useState<"Deposit" | "Withdraw">("Deposit");

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
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
    <div className="flex flex-wrap justify-around gap-4">
      {data?.map((d, i) => {
        return <DepositeRecordCard key={i} data={d} index={i} />;
      })}
    </div>
  );
};

const WithdrawRecord = ({ sellerID }: { sellerID?: string }) => {
  const { data } = useSWR<WithdrawType[]>(`/withdraw/all/${sellerID}`, fetcher);

  return <></>;
};
