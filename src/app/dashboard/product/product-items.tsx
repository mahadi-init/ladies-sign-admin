import DeleteItem from "@/components/native/DeleteItem";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { siteConfig } from "@/site-info";
import Image from "next/image";
import Link from "next/link";
import { ProductResponse } from "./page";

export default function ProductItems({
  products,
}: {
  products: ProductResponse[];
}) {
  return (
    <>
      {products.map((item) => (
        <Card key={item.title} className="w-full md:w-64">
          <CardHeader>
            <CardTitle>
              <Link href={`/dashboard/product/edit/${item._id}`}>
                {item.title}
              </Link>
            </CardTitle>
            <CardDescription className="flex gap-2 text-gray-600 text-xs">
              <span className="text-green-700 font-medium">
                {item.brand.name}
              </span>
              |<span className="text-red-600">{item.productType}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="">
            <Image
              src={item.img}
              alt={item.title}
              width={200}
              height={200}
              className="w-8/12 mx-auto"
            />
          </CardContent>
          <CardFooter>
            <div className="w-full flex justify-between items-center">
              <div>
                <p className="font-semibold">$ {item.price}</p>
                <p className="text-gray-500 text-sm">
                  {item.status} ({item.quantity})
                </p>
              </div>
              <DeleteItem
                // serverAction={deleteData}
                queryUrl={`${siteConfig.BACKEND_URL}/api/product/${item._id}`}
                successMessage="Product deleted successfully"
                validationTag="products"
              />
            </div>
          </CardFooter>
        </Card>
      ))}
    </>
  );
}
