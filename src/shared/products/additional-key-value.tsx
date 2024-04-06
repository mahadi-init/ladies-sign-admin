"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdditionalKeyValue() {
  return (
    <div className="pt-6 border-t border-gray-200">
      <h3 className="text-lg font-medium text-gray-900">
        Additional Information
      </h3>

      <div className="grid items-center grid-cols-3 gap-4 mt-4">
        <div className="col-span-1">
          <label className="block text-sm font-medium text-gray-700">
            Key <span className="text-red-600">*</span>
          </label>
          <Input placeholder="Enter key" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            Value <span className="text-red-600">*</span>
          </label>
          <Input placeholder="Enter value" />
        </div>
      </div>

      <div className="flex justify-end w-full gap-2 mt-4">
        <Button type="button" variant="destructive">
          Remove
        </Button>
        <Button type="button">Add More</Button>
      </div>
    </div>
  );
}
