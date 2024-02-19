import { deleteData } from "@/actions/delete";
import getData from "@/actions/get";
import DeleteItem from "@/components/native/DeleteItem";
import PageTop from "@/components/native/PageTop";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BACKEND_URL } from "@/consts/site-info";
import { Item } from "@radix-ui/react-select";
import { EditIcon } from "lucide-react";
import Image from "next/image";

interface ProductResponse {
  data: {
    _id: string;
    img: string;
    title: string;
    brand: {
      name: string;
    };
    category: {
      name: string;
    };
    price: number;
    status: string;
    quantity: number;
  }[];
}

const getProducts = async () => {
  const data = await getData<ProductResponse>(
    `${BACKEND_URL}/api/product/all`,
    10,
  );

  return data;
};

export default async function Products() {
  const products = await getProducts();

  return (
    <div>
      <PageTop title="Products" />

      <div className="mt-8">
        <div className="flex flex-wrap justify-around gap-8">
          {products.data.map((item) => (
            <Card key={item.title} className="w-10/12 md:w-80">
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="flex gap-2 text-gray-600 text-xs">
                  {item.brand.name} | {item.category.name}
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
                <div className="w-full flex justify-between">
                  <div>
                    <p className="font-semibold">$ {item.price}</p>
                    <p className="text-gray-500 text-sm">
                      {item.status} ({item.quantity})
                    </p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <EditIcon color="green" />
                    <DeleteItem serverAction={deleteData}
                      queryUrl=`${BACKEND_URL}/api/product/${item._id}`}
                      queryUrl=`${BACKEND_URL}/api/product/${i}`
                      successMessage=""
                    />
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
