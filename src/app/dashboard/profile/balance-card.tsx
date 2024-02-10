import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
  CardFooter,
} from "@/components/ui/card";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { TableCell, TableRow, TableBody, Table } from "@/components/ui/table";
import SubmitButton from "@/components/native/SubmitButton";
import { Button } from "@/components/ui/button";
import BottomDrawer from "./BottomDrawer";

export default function BalanceCard() {
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
        <BottomDrawer drawerTrigger={<Button>Withdraw</Button>} />
      </CardFooter>
    </Card>
  );
}

function ArrowDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 5v14" />
      <path d="m19 12-7 7-7-7" />
    </svg>
  );
}

function ArrowUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  );
}

function FileEditIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
    </svg>
  );
}
