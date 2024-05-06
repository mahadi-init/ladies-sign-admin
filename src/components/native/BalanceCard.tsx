"use client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { fetcher } from "@/https/get-request";
import { ArrowDownIcon } from "@/icons/ArrowDownIcon";
import { ArrowUpIcon } from "@/icons/ArrowUpIcon";
import { SellerType } from "@/types/seller.t";
import useSWR from "swr";
import BottomDrawer from "./BottomDrawer";

type TransactionType = {
  deposit: number;
  withdraw: number;
};

export default function BalanceCard({
  profile,
}: {
  profile?: SellerType;
}): JSX.Element {
  const { data: transaction } = useSWR<Partial<TransactionType>>(
    `/transaction/last/${profile?._id}`,
    fetcher,
  );

  return (
    <Card className="flex flex-col w-full shadow">
      <CardHeader className="flex flex-row items-center space-y-0">
        <CardTitle>Account balance</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center space-x-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarFallback>{profile?.name?.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1.5">
            <h3 className="text-lg font-semibold leading-none">
              {profile?.name ?? "Loading.."}
            </h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              ID: {profile?.cid ?? "Loading.."}
            </p>
          </div>
        </div>
        <div className="ml-auto space-y-2 text-right">
          <h3 className="text-2xl font-semibold leading-none">
            ৳ {profile?.balance}
          </h3>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Available balance
          </p>
        </div>
      </CardContent>
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="w-1 text-center">
                <ArrowUpIcon className="w-4 h-4 text-green-600" />
              </TableCell>
              <TableCell className="font-medium">Deposit</TableCell>
              <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                2 days ago
              </TableCell>
              <TableCell className="text-right">
                {transaction?.deposit ?? (
                  <span className="text-red-600 line-through">৳0.00</span>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-1 text-center">
                <ArrowDownIcon className="w-4 h-4 text-red-600" />
              </TableCell>
              <TableCell className="font-medium">Withdraw</TableCell>
              <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                1 day ago
              </TableCell>
              <TableCell className="text-right">
                {transaction?.withdraw ?? (
                  <span className="text-red-600 line-through">৳0.00</span>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-end mt-4 gap-4">
        {/* TODO: ADD REAL NUMBER */}

        <BottomDrawer requestType="Deposit" />
        <BottomDrawer requestType="Withdraw" btnVariants="destructive" />
      </CardFooter>
    </Card>
  );
}