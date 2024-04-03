"use client";
import { HoverToolkit } from "@/components/native/HoverToolkit";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/utils/fetcher";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import useSWR from "swr";
import { BACKEND_URL } from "../../site-config";
import AdditionalKeyValue from "./additional-key-value";

export default function AdditionalInformation() {
  const [createProductType, setCreateProductType] = useState(false);

  const { data: productTypes } = useSWR<{ data: string[] }>(
    `${BACKEND_URL}/api/product/all/product-types`,
    fetcher
  );

  const { data: brands } = useSWR<{ data: string[] }>(
    `${BACKEND_URL}/api/brand/all-names`,
    fetcher
  );

  return (
    <div className="w-full p-6 bg-gray-100 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="product-type"
          >
            ProductType <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-3 items-center">
            {createProductType ? (
              <Input placeholder="Create product type" name="product-type" />
            ) : (
              <select
                name="product-type"
                id="prodcut-type"
                className="mt-0.5 w-full p-2 bg-white rounded-md"
              >
                {productTypes?.data.map((item) => {
                  return (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            )}

            <HoverToolkit
              text={
                createProductType
                  ? "choose product type"
                  : "create product type"
              }
            >
              <a onClick={() => setCreateProductType(!createProductType)}>
                <RefreshCcw />
              </a>
            </HoverToolkit>
          </div>

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
            {brands?.data.map((item) => {
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
function useSwr<T>(arg0: string, arg1: boolean) {
  throw new Error("Function not implemented.");
}
