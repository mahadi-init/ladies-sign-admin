"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ArrowDownIcon } from "@/icons/ArrowDownIcon";
import { ArrowUpIcon } from "@/icons/ArrowUpIcon";
import WithdrawBottomDrawer from "./BottomDrawer";

/**
 * Renders a balance card component displaying account balance information and transaction history.
 *
 * @return {JSX.Element} The rendered balance card component
 */
export default function BalanceCard(): JSX.Element {
  return (
    <Card className="flex flex-col w-full shadow">
      <CardHeader className="flex flex-row items-center space-y-0">
        <CardTitle>Account balance</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center space-x-4">
        <div className="flex items-center space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage alt="@acme" src="/placeholder-user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="space-y-1.5">
            <h3 className="text-lg font-semibold leading-none">John Doe</h3>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Account number: 1234567890
            </p>
          </div>
        </div>
        <div className="ml-auto space-y-2 text-right">
          <h3 className="text-2xl font-semibold leading-none">$2,345.12</h3>
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
              <TableCell className="text-right">+$100.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-1 text-center">
                <ArrowDownIcon className="w-4 h-4 text-red-600" />
              </TableCell>
              <TableCell className="font-medium">Subscription</TableCell>
              <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                1 day ago
              </TableCell>
              <TableCell className="text-right">-$19.99</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="w-1 text-center">
                <ArrowUpIcon className="w-4 h-4 text-green-600" />
              </TableCell>
              <TableCell className="font-medium">Transfer</TableCell>
              <TableCell className="text-sm text-gray-500 dark:text-gray-400">
                3 hours ago
              </TableCell>
              <TableCell className="text-right">+$50.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-end mt-4">
        <WithdrawBottomDrawer />
      </CardFooter>
    </Card>
  );
}