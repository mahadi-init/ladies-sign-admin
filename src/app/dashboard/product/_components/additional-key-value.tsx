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
    } else {
      append({ key: null, value: null });
    }
  }, [append, data]);

  return (
    <div className="rounded-md border-t border-gray-200 bg-gray-100 p-6">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-medium text-gray-900">
          Additional Information
        </h3>

        <a
          type="button"
          className={clsx(
            buttonVariants({ variant: "default" }),
            "ml-auto cursor-pointer",
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
            className="mt-4 flex flex-wrap items-center gap-4"
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

            <div className="w-6/12 lg:w-7/12 2xl:w-8/12">
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

            <div className="mt-4 flex justify-end gap-2">
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
