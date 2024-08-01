"use client";
import { ProductSchema } from "@/types/product";
import clsx from "clsx";
import { Button, Card, Label, TextInput } from "flowbite-react";
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
    <Card>
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-medium text-gray-900">
          Additional Information
        </h3>

        <Button
          size="md"
          type="button"
          className={clsx("ml-auto")}
          onClick={() => append({ key: "", value: "" })}
        >
          Add Information
        </Button>
      </div>

      {fields.map((field, index) => (
        <>
          <div
            key={field.id}
            className="mt-4 flex flex-wrap items-center gap-4"
          >
            <div className="w-1/4">
              <div className="block">
                <div className="mb-1">
                  <Label htmlFor="key" value="Key *" />
                </div>
                <TextInput
                  key={field.id}
                  placeholder="Enter key"
                  {...register(`additionalInformation.${index}.key`, {
                    required: true,
                  })}
                />
              </div>
            </div>

            <div className="w-6/12 lg:w-7/12 2xl:w-8/12">
              <div className="block">
                <div className="mb-1">
                  <Label htmlFor="value" value="Value *" />
                </div>
                <TextInput
                  key={field.id}
                  placeholder="Enter value"
                  {...register(`additionalInformation.${index}.value`, {
                    required: true,
                  })}
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                color="failure"
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
    </Card>
  );
}
