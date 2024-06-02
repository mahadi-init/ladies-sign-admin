"use client";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/https/get-request";
import { ProductSchema, ProductType } from "@/types/product.t";
import { useFormContext } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";
import AdditionalKeyValue from "./additional-key-value";

const additionalInfoSchema = ProductSchema.pick({
  productType: true,
  brand: true,
  unit: true,
});
type AdditionalInfoType = z.infer<typeof additionalInfoSchema>;

export default function AdditionalInformation({
  data,
}: {
  data?: AdditionalInfoType;
}) {
  const { register } = useFormContext<ProductType>();
  const { data: productTypes } = useSWR<string[]>(
    "/extra/all/product-types",
    fetcher
  );
  const { data: brands } = useSWR<string[]>("/brand/all-names", fetcher);

  return (
    <div className="w-full p-6 bg-gray-100 rounded-lg shadow">
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3 items-center">
        <div>
          <label
            htmlFor="product-type"
            id="product-type"
            className="block text-sm font-medium text-gray-700"
          >
            ProductType <span className="text-red-500">*</span>
          </label>
          <select
            id="product-type"
            defaultValue={data?.productType ?? productTypes?.[0]}
            className="mt-0.5 w-full p-2 bg-white rounded-md"
            {...register("productType", { required: true })}
          >
            {productTypes?.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>

          <p className="mt-2 text-sm text-gray-500">
            Set the product ProductType.
          </p>
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="brand"
          >
            Brand <span className="text-red-500">*</span>
          </label>
          <select
            id="brand"
            defaultValue={data?.brand?.name ?? brands?.[0]}
            className="mt-0.5 w-full p-2 bg-white rounded-md"
            {...register("brand.name", { required: true })}
          >
            {brands?.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <p className="mt-2 text-sm text-gray-500">Set the product Brand.</p>
        </div>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="unit"
          >
            Unit <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            id="unit"
            defaultValue={data?.unit}
            placeholder="Product unit"
            {...register("unit", { required: true })}
          />
          <p className="mt-2 text-sm text-gray-500">Set the unit of product.</p>
        </div>
      </div>
      <AdditionalKeyValue data={data as ProductType} />
    </div>
  );
}
