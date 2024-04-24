"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetcher } from "@/https/get-request";
import { ExtraType } from "@/types/extra.t";
import { ProductType } from "@/types/product.t";
import clsx from "clsx";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import useSWR from "swr";

export default function ProductVariants() {
  const { data } = useSWR<ExtraType>("/extra/all", fetcher);
  const [images, setImages] = useState<string[]>([]);
  const { register } = useFormContext<ProductType>();
  const { fields, append, remove, update } = useFieldArray({
    name: "variants",
  });

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="flex gap-2 items-center">
        <h3 className="text-lg font-medium text-gray-900">Product Variants</h3>

        <a
          type="button"
          className={clsx(
            buttonVariants({ variant: "default" }),
            "ml-auto cursor-pointer"
          )}
          onClick={() => append({})}
        >
          Add Variants
        </a>
      </div>
      {fields.map((field, index) => {
        return (
          <div key={index} className="w-full mt-4">
            <div className="grid items-center w-full grid-cols-1 gap-4 mb-6 lg:grid-cols-2 xl:grid-cols-5">
              <div className="flex items-center gap-4">
                <Input type="file" />
                <div className="w-full">
                  <Label
                    htmlFor="colorName"
                    className="block mb-1 text-sm font-medium"
                  >
                    Color Name <span className="text-red-600">*</span>
                  </Label>
                  <select
                    id="colorName"
                    key={field.id}
                    defaultValue={data?.colors?.[0].name}
                    className="mt-0.5 w-full p-2 bg-white rounded-md"
                    {...register(`variants.${index}.code`, { required: true })}
                  >
                    <option
                      value={data?.colors?.[0].name}
                      selected
                      disabled
                      hidden
                    >
                      {data?.colors?.[0].name}
                    </option>
                    {data?.colors?.map((color) => {
                      return (
                        <option key={color.name} value={color.name}>
                          {color.name}
                        </option>
                      );
                    })}
                  </select>
                  <p className="mt-1 text-xs">enter color name. ex:green</p>
                </div>
              </div>
              <div>
                <label
                  htmlFor="size"
                  className="block mb-1 text-sm font-medium"
                >
                  Sizes <span className="text-red-600">*</span>
                </label>
                <select
                  id="size"
                  key={field.id}
                  defaultValue={data?.sizes?.[0]}
                  className="mt-0.5 w-full p-2 bg-white rounded-md"
                  {...register(`variants.${index}.size`, { required: true })}
                >
                  <option value={data?.sizes?.[0]} selected disabled hidden>
                    {data?.sizes?.[0]}
                  </option>
                  {data?.sizes?.map((size) => {
                    return (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    );
                  })}
                </select>
                <p className="mt-1 text-xs">enter size.ex:XL</p>
              </div>
              <div>
                <label
                  htmlFor="quantity"
                  className="block mb-1 text-sm font-medium "
                >
                  Quantity <span className="text-red-600">*</span>
                </label>
                <Input
                  id="quantity"
                  key={field.id}
                  type="number"
                  placeholder="Quantity"
                  {...register(`variants.${index}.quantity`, {
                    required: true,
                  })}
                />
                <p className="mt-1 text-xs">Quantity with that color</p>
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block mb-1 text-sm font-medium"
                >
                  Price <span className="text-red-600">*</span>
                </label>
                <Input
                  id="price"
                  key={field.id}
                  type="number"
                  placeholder="Price"
                  {...register(`variants.${index}.price`, { required: true })}
                />
                <p className="mt-1 text-xs">Quantity with that color</p>
              </div>
              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
