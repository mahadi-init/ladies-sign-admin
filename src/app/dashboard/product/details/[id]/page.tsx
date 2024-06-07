"use client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { fetcher } from "@/https/get-request";
import { ProductType } from "@/types/product.t";
import Image from "next/image";
import useSWR from "swr";

export default function EditProduct({ params }: { params: { id: string } }) {
  const { data: product } = useSWR<ProductType>(
    `/product/get/${params.id}`,
    fetcher,
  );

  return (
    <div>
      <p className="text-center text-3xl font-semibold text-amber-500">
        {product?.name}
      </p>

      <div className="mt-8 grid grid-cols-1 items-center gap-4 xl:grid-cols-2 2xl:grid-cols-3">
        <Card className="flex items-center gap-2">
          {product?.thumbnail && (
            <Image
              src={product?.thumbnail ?? ""}
              className="mt-2 max-w-xs rounded-md"
              alt={product?.name ?? "product img"}
              width={500}
              height={500}
              loading="lazy"
            />
          )}

          <Badge className="text-2xl font-bold text-green-400">Thumbnail</Badge>
        </Card>

        {product?.variants?.map((variant, index) => (
          <Card key={index} className="flex gap-8 p-4">
            <Image
              className="mt-2 max-w-xs rounded-md"
              src={variant?.img}
              width={300}
              height={300}
              alt="mini variant"
            />
            <div className="text-md flex flex-col justify-center gap-4 font-semibold">
              <p>
                <span>Color : {variant.color}</span>
              </p>
              <p>
                <span>Size : {variant.size}</span>
              </p>
              <p>
                <span>Price :{variant.price}</span>
              </p>
              <p>
                <span>Quantity: {variant.quantity}</span>
              </p>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <p className="mb-4 text-center text-lg font-medium underline">
          Details
        </p>

        <div className="overflow-hidden">
          <table className="text-surface min-w-full text-left text-sm font-light dark:text-white">
            <thead className="rounded-md border-b border-neutral-200 bg-sky-700 font-medium text-white dark:border-white/10">
              <tr>
                <th scope="col" className="px-6 py-4">
                  #
                </th>
                <th scope="col" className="px-6 py-4">
                  Title
                </th>
                <th scope="col" className="px-6 py-4">
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="font-medium">
              <tr className="border-b border-neutral-200 dark:border-white/10">
                <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  Description
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {product?.description}
                </td>
              </tr>

              <tr className="border-b border-neutral-200 bg-gray-100 dark:border-white/10">
                <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  Price
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {product?.price}
                </td>
              </tr>

              <tr className="border-b border-neutral-200 dark:border-white/10">
                <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  Seller Price
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {product?.sellerPrice}
                </td>
              </tr>

              <tr className="border-b border-neutral-200 bg-gray-100 dark:border-white/10">
                <td className="whitespace-nowrap px-6 py-4 font-medium">4</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  Quantity
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {product?.quantity}
                </td>
              </tr>

              <tr className="border-b border-neutral-200 dark:border-white/10">
                <td className="whitespace-nowrap px-6 py-4 font-medium">5</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  Price
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {product?.price}
                </td>
              </tr>

              <tr className="border-b border-neutral-200 dark:border-white/10">
                <td className="whitespace-nowrap px-6 py-4 font-medium">7</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">SKU</td>
                <td className="whitespace-nowrap px-6 py-4">{product?.sku}</td>
              </tr>

              <tr className="border-b border-neutral-200 bg-gray-100 dark:border-white/10">
                <td className="whitespace-nowrap px-6 py-4 font-medium">8</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  Video ID
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {product?.videoId ?? "-"}
                </td>
              </tr>

              <tr className="border-b border-neutral-200 bg-gray-100 dark:border-white/10">
                <td className="whitespace-nowrap px-6 py-4 font-medium">11</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  Unit
                </td>
                <td className="whitespace-nowrap px-6 py-4">{product?.unit}</td>
              </tr>

              <tr className="border-b border-neutral-200 bg-gray-100 dark:border-white/10">
                <td className="whitespace-nowrap px-6 py-4 font-medium">13</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  Sell count
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  {product?.sellCount}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {product?.additionalInformation &&
        product.additionalInformation.length > 0 && (
          <div className="mt-8">
            <p className="mb-4 text-center text-lg font-medium underline">
              Additional Information
            </p>

            <div className="overflow-hidden">
              <table className="text-surface min-w-full text-left text-sm font-light dark:text-white">
                <thead className="dark:border-white/ border-b border-neutral-200 bg-green-700 font-medium text-white">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      #
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Key
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {product?.additionalInformation?.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-neutral-200 dark:border-white/10"
                    >
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {index + 1}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {item.key}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
    </div>
  );
}
