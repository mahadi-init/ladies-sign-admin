"use client";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/https/get-request";
import useSWR from "swr";
import AdditionalKeyValue from "./additional-key-value";

export default function AdditionalInformation() {
  const { data: productTypes } = useSWR<string[]>(
    "/extra/all/product-types",
    fetcher
  );
  const { data: brands } = useSWR<string[]>("/brand/all-names", fetcher);

  return (
    <div className="w-full p-6 bg-gray-100 rounded-lg shadow">
      <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="product-type"
          >
            ProductType <span className="text-red-500">*</span>
          </label>
          <select className="mt-0.5 w-full p-2 bg-white rounded-md">
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
            name="brand"
            id="brand"
            className="mt-0.5 w-full p-2 bg-white rounded-md"
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
          <Input type="text" id="unit" placeholder="Product unit" name="unit" />
          <p className="mt-2 text-sm text-gray-500">Set the unit of product.</p>
        </div>
      </div>
      <AdditionalKeyValue />
    </div>
  );
}
