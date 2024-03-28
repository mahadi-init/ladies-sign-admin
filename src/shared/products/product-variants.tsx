"use client";

import ImageUploader from "@/components/native/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

type ValueType = {
  image: string;
  colorName: string;
  size: string;
  quantity: Number;
  price: Number;
};

export default function ProductVariants() {
  const [values, setValues] = useState<Partial<ValueType>[]>([{}]);
  console.log(values);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Product Variations</h1>
      <hr className="mb-6" />
      {values.map((value, index) => {
        return (
          <div key={index} className="w-full">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 items-center gap-4 mb-6">
              <div className="flex items-center gap-4">
                <ImageUploader
                  image={value.image}
                  setImage={(img) => {
                    setValues((prev) => {
                      prev[index].image = img;
                      return [...prev];
                    });
                  }}
                  style="w-24 relative top-8"
                />
                <div className="w-full">
                  <Label className="block text-sm font-medium mb-1">
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
                  <p className="text-xs mt-1">enter color name. ex:green</p>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
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
                  <option value="xl">XL</option>
                  <option value="2xl">2XL</option>
                </select>
                <p className="text-xs mt-1">enter size.ex:XL</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
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
                <p className="text-xs mt-1">Quantity with that color</p>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
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
                <p className="text-xs mt-1">Quantity with that color</p>
              </div>
            </div>
          </div>
        );
      })}
      <div className="mt-4 flex gap-2 w-full justify-end">
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
