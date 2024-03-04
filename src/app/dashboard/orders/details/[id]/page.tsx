import getData from "@/actions/get";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BACKEND_URL } from "@/consts/site-info";
import { OrderType } from "@/types/order";
import Link from "next/link";

export default async function OrderDetails({
  params,
}: {
  params: { id: string };
}) {
  const details = await getData<OrderType>(
    `${BACKEND_URL}/api/order/${params.id}`,
    10,
    ["details"]
  );

  console.log(details);

  return (
    <div>
      <h2 className="text-3xl text-center">Order Details</h2>
      <div>
        <p className="text-xl">Invoice: #{details.invoice}</p>
        <p className="text-xl">Customer Name: {details.name}</p>
        <p className="text-xl">Customer Address: {details.address}</p>
        {details.trackingCode && (
          <p className="text-xl">Tracking Code: {details.trackingCode}</p>
        )}
        {details.trackingLink && (
          <Link href={details.trackingLink}>
            Tracking Link : {details.trackingLink}
          </Link>
        )}
      </div>
      <Table className="mt-12">
        <TableCaption>
          Order Placed on{" "}
          {new Date(details.createdAt!!).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No.</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Brand</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Sku</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {details.cart.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.productType}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.status}</TableCell>
              <TableCell>{item.brand.name}</TableCell>
              <TableCell>{item.category.name}</TableCell>
              <TableCell className="text-right">{item.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={8}>Total</TableCell>
            <TableCell className="text-right">৳{details.totalAmount}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
