"use client";
import LoadingOrShow from "@/components/native/LoadingOrShow";
import PageTop from "@/components/native/PageTop";
import { fetcher } from "@/https/get-request";
import { ProductType } from "@/types/product.t";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

export default function ProductDetails({ params }: { params: { id: string } }) {
  const { data, isLoading, error } = useSWR<ProductType>(
    "/product/get/" + params.id,
    fetcher,
  );

  return (
    <>
      <PageTop title="Product Details" />

      <div className="mt-4">
        <LoadingOrShow isLoading={isLoading} error={error}>
          <div className="flex flex-col gap-2 font-medium">
            <p>Name: {data?.name}</p>
            <p>Description: {data?.description}</p>
            <p>Sku : {data?.sku}</p>
            {data?.videoId && (
              <Link href={data?.videoId}>Youtube : {data?.videoId}</Link>
            )}
            <p>Discount: {data?.discount} TK</p>
            <p>
              Status :{" "}
              <span
                className={
                  data?.status === "IN-STOCK"
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {data?.status}
              </span>
            </p>

            <p className="mt-2 text-lg font-bold">Additional Information</p>
            {data?.additionalInformation?.map((info) => {
              return (
                <div key={info.key}>
                  <p>
                    {info.key} : {info.value}
                  </p>
                </div>
              );
            })}

            <p className="mt-2 text-lg font-bold">Product Variants</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data?.variants?.map((variant, index) => {
                return (
                  <div key={variant.img} className="flex flex-col gap-2">
                    <p>Index : # {index + 1}</p>
                    <p>Color : {variant.color}</p>
                    <p>Size : {variant.size}</p>
                    <p>Quantity : {variant.quantity}</p>
                    <p>Price : {variant.price}</p>
                    <p>Seller Price : {variant.sellerPrice}</p>
                    <Image
                      src={variant.img}
                      alt="product-variant"
                      width={200}
                      height={200}
                      className="rounded-lg"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </LoadingOrShow>
      </div>
    </>
  );
}
