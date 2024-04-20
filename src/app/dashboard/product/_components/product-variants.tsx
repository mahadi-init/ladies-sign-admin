"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetcher } from "@/https/get-request";
import { ExtraType } from "@/types/extra.t";
import { useState } from "react";
import { toast } from "sonner";
import useSWR from "swr";
import MiniImageUploader from "./mini-img-uploader";

type ValueType = {
  image: string;
  colorName: string;
  size: string;
  quantity: Number;
  price: Number;
};

export default function ProductVariants() {
  const { data } = useSWR<ExtraType>("/extra/all", fetcher);
  const [values, setValues] = useState<Partial<ValueType>[]>([{}]);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="mb-4 text-2xl font-bold">Product Variations</h1>
      <hr className="mb-6" />
      {values.map((value, index) => {
        return (
          <div key={index} className="w-full">
            <div className="grid items-center w-full grid-cols-1 gap-4 mb-6 lg:grid-cols-2 xl:grid-cols-4">
              <div className="flex items-center gap-4">
                <MiniImageUploader
                  image={value.image}
                  setImage={(img) => {
                    setValues((prev) => {
                      prev[index].image = img;
                      return [...prev];
                    });
                  }}
                  style="w-24 relative"
                />
                <div className="w-full">
                  <Label className="block mb-1 text-sm font-medium">
                    Color Name <span className="text-red-600">*</span>
                  </Label>
                  <select
                    className="mt-0.5 w-full p-2 bg-white rounded-md"
                    onChange={(e) => {
                      setValues((prev) => {
                        prev[index].colorName = e.target.value;
                        return [...prev];
                      });
                    }}
                  >
                    <option value="green">Green</option>
                    <option value="red">Red</option>
                  </select>
                  <p className="mt-1 text-xs">enter color name. ex:green</p>
                </div>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Sizes <span className="text-red-600">*</span>
                </label>
                <select
                  className="mt-0.5 w-full p-2 bg-white rounded-md"
                  onChange={(e) => {
                    setValues((prev) => {
                      prev[index].size = e.target.value;
                      return [...prev];
                    });
                  }}
                >
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
                <label className="block mb-1 text-sm font-medium ">
                  Quantity <span className="text-red-600">*</span>
                </label>
                <Input
                  type="number"
                  placeholder="Quantity"
                  onChange={(e) => {
                    setValues((prev) => {
                      prev[index].quantity = Number(e.target.value);
                      return [...prev];
                    });
                  }}
                />
                <p className="mt-1 text-xs">Quantity with that color</p>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">
                  Price <span className="text-red-600">*</span>
                </label>
                <Input
                  type="number"
                  placeholder="Price"
                  onChange={(e) => {
                    setValues((prev) => {
                      prev[index].price = Number(e.target.value);
                      return [...prev];
                    });
                  }}
                />
                <p className="mt-1 text-xs">Quantity with that color</p>
              </div>
            </div>
          </div>
        );
      })}
      <div className="flex justify-end w-full gap-2 mt-4">
        <Button
          type="button"
          variant="destructive"
          onClick={() => {
            if (values.length <= 1) {
              return;
            }
            const v = [...values];
            v.pop();

            setValues([...v]);
          }}
        >
          Remove
        </Button>
        <Button
          type="button"
          onClick={() => {
            if (Object.keys(values[values.length - 1]).length === 0) {
              toast.error("Empty value found");
              return;
            }

            setValues([...values, {}]);
          }}
        >
          Add Variants
        </Button>
      </div>
    </div>
  );
}
