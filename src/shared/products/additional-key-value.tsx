"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

export default function AdditionalKeyValue() {
  const [items, setItems] = useState([Math.random()]);

  return (
    <div className="border-t border-gray-200 pt-6">
      <h3 className="text-lg font-medium text-gray-900">
        Additional Information
      </h3>

      <div className="grid grid-cols-3 items-center gap-4 mt-4">
        {items.map((_, index) => {
          return (
            <React.Fragment key={index}>
              <div className="col-span-1">
                <label className="block text-sm font-medium text-gray-700">
                  Key <span className="text-red-600">*</span>
                </label>
                <Input placeholder="Enter key" name={`key-${index}`} />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Value <span className="text-red-600">*</span>
                </label>
                <Input placeholder="Enter value" name={`value-${index}`} />
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <p className="text-red-500 text-xs my-1">Empty values will be ignored</p>

      <div className="mt-4 flex gap-2 w-full justify-end">
        <Button
          type="button"
          variant="destructive"
          onClick={() => {
            if (items.length > 1) {
              setItems(items.filter((_, i) => i !== items.length - 1));
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
          Add More
        </Button>
      </div>
    </div>
  );
}
