"use client";
import PageTop from "@/components/native/PageTop";
import SixSkeleton from "@/components/native/SixSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/https/get-request";
import ProductItems from "@/shared/products/product-items";
import { ProductType } from "@/types/product.t";
import { BadgePlus } from "lucide-react";
import Link from "next/link";
import useSWR from "swr";

export default function Products() {
  const { data: products } = useSWR<ProductType[]>("/product/all", fetcher);
  const { data: productTypes } = useSWR<string[]>(
    `/extra/all/product-types`,
    fetcher
  );

  return (
    <>
      <PageTop title="Products" />
      <div className="my-8 flex justify-between items-center">
        <Input placeholder="search for product" className="w-5/12" />
        <div className="flex items-center gap-2">
          {productTypes && (
            <select
              id="product-type"
              defaultValue={productTypes}
              className="mt-0.5 w-full p-2.5 bg-gray-100 rounded-md"
            >
              {productTypes.map((item) => {
                return (
                  <option value={item} key={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          )}
          <Link
            href={`/dashboard/product/add`}
            className={buttonVariants({ size: "sm", variant: "outline" })}
          >
            <BadgePlus />
          </Link>
        </div>
      </div>
      <div className="flex flex-wrap gap-12">
        {products ? <ProductItems products={products} /> : <SixSkeleton />}
      </div>
    </>
  );
}
