"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductSchema } from "@/types/product.t";
import clsx from "clsx";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { z } from "zod";

const additionalKeyValueSchema = ProductSchema.pick({
  additionalInformation: true,
});
type AdditionalKeyValueType = z.infer<typeof additionalKeyValueSchema>;

export default function AdditionalKeyValue({
  data,
}: {
  data?: AdditionalKeyValueType;
}) {
  const { register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: "additionalInformation",
  });

  useEffect(() => {
    if (data) {
      data?.additionalInformation?.map((item: any) => {
        append({ key: item.key, value: item.value });
      });
    }
  }, [append, data]);

  return (
    <div className="pt-6 border-t border-gray-200">
      <div className="flex gap-2 items-center">
        <h3 className="text-lg font-medium text-gray-900">
          Additional Information
        </h3>

        <a
          type="button"
          className={clsx(
            buttonVariants({ variant: "default" }),
            "ml-auto cursor-pointer"
          )}
          onClick={() => append({ key: "", value: "" })}
        >
          Add Information
        </a>
      </div>

      {fields.map((field, index) => (
        <>
          <div
            key={field.id}
            className="flex items-center flex-wrap gap-4 mt-4"
          >
            <div className="w-1/4">
              <label className="block text-sm font-medium text-gray-700">
                Key <span className="text-red-600">*</span>
              </label>
              <Input
                key={field.id}
                placeholder="Enter key"
                {...register(`additionalInformation.${index}.key`, {
                  required: true,
                })}
              />
            </div>

            <div className="w-6/12  lg:w-7/12 2xl:w-8/12">
              <label className="block text-sm font-medium text-gray-700">
                Value <span className="text-red-600">*</span>
              </label>
              <Input
                key={field.id}
                placeholder="Enter value"
                {...register(`additionalInformation.${index}.value`, {
                  required: true,
                })}
              />
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  remove(index);
                }}
              >
                <Trash2 />
              </Button>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}
