"use client";
import { ProductSchema, ProductType } from "@/types/product";
import { Card, Label, Textarea, TextInput } from "flowbite-react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

const generalInformation = ProductSchema.pick({
  name: true,
  description: true,
  sku: true,
  videoId: true,
  discount: true,
});
type GeneralInformationType = z.infer<typeof generalInformation>;

export default function GeneralInformation({
  data,
}: {
  data?: GeneralInformationType;
}) {
  const {
    register,
    formState: { errors },
  } = useFormContext<ProductType>();

  return (
    <Card>
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">General</h2>
        <div className="grid grid-cols-1 gap-4">
          <div className="block">
            <div className="mb-1">
              <Label htmlFor="title" value="Title *" />
            </div>

            <TextInput
              type="text"
              id="title"
              color={errors.name && "error"}
              helperText={errors.name && errors.name.message}
              defaultValue={data?.name}
              placeholder="Enter title"
              {...register("name", { required: true })}
            />
          </div>

          <div className="block">
            <div className="mb-1">
              <Label htmlFor="description" value="Description *" />
            </div>
            <Textarea
              id="description"
              defaultValue={data?.description}
              placeholder="Product Description"
              rows={4}
              {...register("description", { required: true })}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="block">
          <div className="mb-1">
            <Label htmlFor="discount" value="Discount (%)" />
          </div>
          <TextInput
            type="text"
            id="discount"
            defaultValue={data?.discount}
            color={errors.discount && "error"}
            placeholder="Enter disount (in percentage)"
            helperText={errors.discount && errors.discount.message}
            {...register("discount", { required: false })}
          />
        </div>

        <div className="block">
          <div className="mb-1">
            <Label htmlFor="sku" value="SKU *" />
          </div>
          <TextInput
            type="text"
            id="sku"
            defaultValue={data?.sku}
            color={errors.sku && "error"}
            placeholder="Enter sku"
            helperText={errors.sku && errors.sku.message}
            {...register("sku", { required: false })}
          />
        </div>

        <div className="block">
          <div className="mb-1">
            <Label htmlFor="video-id" value="Video ID" />
          </div>
          <TextInput
            id="video-id"
            defaultValue={data?.videoId}
            placeholder="Enter youtube url"
            color={errors.videoId && "error"}
            helperText={errors.videoId && errors.videoId.message}
            {...register("videoId", { required: false })}
          />
        </div>
      </div>
    </Card>
  );
}