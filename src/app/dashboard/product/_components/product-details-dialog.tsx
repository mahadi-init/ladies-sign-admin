"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { fetcher } from "@/https/get-request";
import { ProductType } from "@/types/product.t";
import { Edit2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

export default function ProductDetailsDialog({ id }: { id?: string }) {
  const { data: product } = useSWR<ProductType>(`/product/get/${id}`, fetcher);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="-ml-3">
          {product?.name}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{product?.name}</DialogTitle>
          <DialogDescription>{product?.description}</DialogDescription>
        </DialogHeader>
        <div>
          <div>
            <div>
              <table className="text-surface min-w-full text-left text-sm font-light dark:text-white">
                <thead className="rounded-md border-b border-neutral-200 bg-sky-700 font-medium text-white">
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
                  <tr className="border-b border-neutral-200 bg-gray-100">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      1
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      Price
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {product?.price}
                    </td>
                  </tr>

                  <tr className="border-b border-neutral-200">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      2
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      Status
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {product?.status}
                    </td>
                  </tr>

                  <tr className="border-b border-neutral-200 bg-gray-100">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      3
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      Sell Count
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {product?.sellCount}
                    </td>
                  </tr>

                  <tr className="border-b border-neutral-200">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      3
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      Seller Price
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {product?.sellerPrice}
                    </td>
                  </tr>

                  <tr className="border-b border-neutral-200 bg-gray-100">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      4
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      Quantity
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {product?.quantity}
                    </td>
                  </tr>

                  <tr className="border-b border-neutral-200">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      4
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      Discount
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {product?.discount}
                    </td>
                  </tr>

                  <tr className="border-b border-neutral-200 bg-gray-100">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      5
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      SKU
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {product?.sku}
                    </td>
                  </tr>

                  <tr className="border-b border-neutral-200">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      6
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      Product Type
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {product?.productType}
                    </td>
                  </tr>

                  <tr className="border-b border-neutral-200 bg-gray-100">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      7
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      Category
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {product?.category?.name}
                    </td>
                  </tr>

                  <tr className="border-b border-neutral-200">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      8
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      Brand
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {product?.brand?.name}
                    </td>
                  </tr>

                  <tr className="border-b border-neutral-200 bg-gray-100">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      9
                    </td>
                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                      Unit
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {product?.unit}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <DialogFooter className="ml-12">
          <Link href={`/dashboard/product/edit/${product?._id}`}>
            <Edit2Icon />
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
