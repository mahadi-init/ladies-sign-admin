"use client";

import FormImageUploader from "@/components/native/FormImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

export default function ProductVariants() {
  const [items, setItems] = useState([Math.random()]);

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Product Variations</h1>
      <hr className="mb-6" />
      <>
        {items.map((_, index) => {
          return (
            <React.Fragment key={index}>
              <div>
                <div className="flex flex-col items-center">
                  <FormImageUploader name={`image-${index}`} />
                </div>
                <div className="mt-8 grid grid-cols-2  lg:grid-cols-4 items-center gap-4 mb-6">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium mb-1">
                      Color Name <span className="text-red-600">*</span>
                    </label>
                    <Input
                      placeholder="Color Name"
                      name={`color-name-${index}`}
                    />
                    <p className="text-xs mt-1">
                      Set the Color name of product.
                    </p>
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-medium mb-1">
                      Color Code <span className="text-red-600">*</span>
                    </label>
                    <Input
                      type="color"
                      placeholder="Color Code"
                      name={`color-code-${index}`}
                    />
                    <p className="text-xs mt-1">Hex code here ex:#3C3C3D</p>
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-medium mb-1">
                      Sizes <span className="text-red-600">*</span>
                    </label>
                    <Input placeholder="XL,2XL,3XL" name={`sizes-${index}`} />
                    <p className="text-xs mt-1">
                      enter all sizes (comma separated)
                    </p>
                  </div>
                  <div className="col-span-1">
                    <label className="block text-sm font-medium mb-1">
                      Quantity <span className="text-red-600">*</span>
                    </label>
                    <Input
                      type="number"
                      placeholder="Color Name"
                      name={`quantity-${index}`}
                    />
                    <p className="text-xs mt-1">Quantity with that color</p>
                  </div>
                </div>

                {items.length > 1 && (
                  <hr className="mb-6 border-spacing-1.5 border-gray-600" />
                )}
              </div>
              <div className="mt-4 flex gap-2 w-full justify-end">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => {
                    if (items.length > 1) {
                      setItems(items.filter((_, i) => i !== index));
                    }
                  }}
                >
                  Remove
                </Button>
                <Button
                  type="button"
                  onClick={() => {
                    setItems([...items, Math.random()]);
                  }}
                >
                  Add Variants
                </Button>
              </div>
            </React.Fragment>
          );
        })}
      </>
    </div>
  );
}
