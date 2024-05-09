import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function OrderDetails({
  params,
}: {
  params: { id: string };
}) {
  // const details = await getData<OrderType>(
  //   `${BACKEND_URL}/api/order/${params.id}`,
  //   true,
  //   10,
  //   ["details"]
  // );

  return (
    <div>
      <h2 className="text-3xl text-center">Order Details</h2>
      <div>
        {/* <p className="text-xl">Invoice: #{details.invoice}</p>
        <p className="text-xl">Customer Name: {details.name}</p>
        <p className="text-xl">Customer Address: {details.address}</p>
        {details.trackingCode && (
          <p className="text-xl">Tracking Code: {details.trackingCode}</p>
        )}
        {details.trackingLink && (
          <Link href={details.trackingLink as Route}>
            Tracking Link : {details.trackingLink}
          </Link>
        )} */}
      </div>
      <Table className="mt-12">
        {/* <TableCaption>
          Order Placed on{" "}
          {new Date(details.createdAt!!).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </TableCaption> */}
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
          {/* {details.cart.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.productType}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell
                className={clsx(
                  item.status === "IN-STOCK"
                    ? "text-green-700 fon-semibold"
                    : "text-red-700 font-semibold"
                )}
              >
                {item.status}
              </TableCell>
              <TableCell>{item.brand.name}</TableCell>
              <TableCell>{item.category.name}</TableCell>
              <TableCell>{item.sku}</TableCell>
              <TableCell>{item.orderQuantity}</TableCell>
              <TableCell className="text-right">{item.price}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={8}>Total</TableCell>
            {/* <TableCell className="text-right">৳{details.totalAmount}</TableCell> */}
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
