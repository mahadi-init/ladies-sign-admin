"use client";
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
      <p className="text-2xl font-semibold text-amber-500">{product?.name}</p>

      {product?.img && (
        <Image
          src={product?.img ?? ""}
          className="rounded-md mt-2"
          alt={product?.name ?? "product img"}
          width={500}
          height={500}
          loading="lazy"
        />
      )}

      <div className="mt-8">
        <p className="text-lg font-medium underline">Product variants</p>

        {product?.variants?.map((variant, index) => (
          <div key={index} className="flex gap-8">
            <Image
              className="rounded-md mt-2"
              src={variant?.img}
              width={250}
              height={250}
              alt="mini variant"
            />
            <div className="flex flex-col gap-4">
              <p>Name: {variant.color}</p>
              <p>{variant.code}</p>
              <p>{variant.size}</p>
              <p>{variant.price}</p>
              <p>{variant.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <p className="text-lg font-medium underline">Details</p>

        <div className="overflow-hidden">
          <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
            <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
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
                <td className="whitespace-nowrap px-6 py-4 ">
                  {product?.description}
                </td>
              </tr>

              <tr className="border-b border-neutral-200 dark:border-white/10">
                <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  Price
                </td>
                <td className="whitespace-nowrap px-6 py-4 ">
                  {product?.price}
                </td>
              </tr>

              <tr className="border-b border-neutral-200 dark:border-white/10">
                <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  Seller Price
                </td>
                <td className="whitespace-nowrap px-6 py-4 ">
                  {product?.sellerPrice}
                </td>
              </tr>

              <tr className="border-b border-neutral-200 dark:border-white/10">
                <td className="whitespace-nowrap px-6 py-4 font-medium">4</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  Quantity
                </td>
                <td className="whitespace-nowrap px-6 py-4 ">
                  {product?.quantity}
                </td>
              </tr>

              <tr className="border-b border-neutral-200 dark:border-white/10">
                <td className="whitespace-nowrap px-6 py-4 font-medium">5</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  Price
                </td>
                <td className="whitespace-nowrap px-6 py-4 ">
                  {product?.price}
                </td>
              </tr>

              <tr className="border-b border-neutral-200 dark:border-white/10">
                <td className="whitespace-nowrap px-6 py-4 font-medium">6</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  Discount
                </td>
                <td className="whitespace-nowrap px-6 py-4 ">
                  {product?.discount}
                </td>
              </tr>

              <tr className="border-b border-neutral-200 dark:border-white/10">
                <td className="whitespace-nowrap px-6 py-4 font-medium">7</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">SKU</td>
                <td className="whitespace-nowrap px-6 py-4 ">{product?.sku}</td>
              </tr>

              <tr className="border-b border-neutral-200 dark:border-white/10">
                <td className="whitespace-nowrap px-6 py-4 font-medium">8</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  Video ID
                </td>
                <td className="whitespace-nowrap px-6 py-4 ">
                  {product?.videoId ?? "-"}
                </td>
              </tr>

              <tr className="border-b border-neutral-200 dark:border-white/10">
                <td className="whitespace-nowrap px-6 py-4 font-medium">9</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  Product Type
                </td>
                <td className="whitespace-nowrap px-6 py-4 ">
                  {product?.productType}
                </td>
              </tr>

              <tr className="border-b border-neutral-200 dark:border-white/10">
                <td className="whitespace-nowrap px-6 py-4 font-medium">10</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  Brand
                </td>
                <td className="whitespace-nowrap px-6 py-4 ">
                  {product?.brand?.name}
                </td>
              </tr>

              <tr className="border-b border-neutral-200 dark:border-white/10">
                <td className="whitespace-nowrap px-6 py-4 font-medium">11</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  Unit
                </td>
                <td className="whitespace-nowrap px-6 py-4 ">
                  {product?.unit}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-lg font-medium underline">More..</p>

        <div className="overflow-hidden">
          <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
            <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
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
            <tbody>
              <tr className="border-b border-neutral-200 dark:border-white/10">
                <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  Description
                </td>
                <td className="whitespace-nowrap px-6 py-4 ">
                  {product?.description}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
