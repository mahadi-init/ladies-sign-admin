"use client";
import { ProductSchema, ProductType } from "@/types/product";
import { Card, FloatingLabel, Textarea } from "flowbite-react";
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
          <FloatingLabel
            label="Title *"
            variant="outlined"
            type="text"
            id="title"
            color={errors.name && "error"}
            helperText={errors.name && errors.name.message}
            defaultValue={data?.name}
            {...register("name", { required: true })}
          />

          <Textarea
            id="description"
            defaultValue={data?.description}
            placeholder="Product Description"
            className="bg-white"
            rows={4}
            {...register("description", { required: true })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <FloatingLabel
          label="Discount"
          variant="outlined"
          type="text"
          id="discount"
          defaultValue={data?.sku}
          color={errors.discount && "error"}
          helperText={errors.discount && errors.discount.message}
          {...register("discount", { required: false })}
        />

        <FloatingLabel
          label="SKU *"
          variant="outlined"
          type="text"
          id="sku"
          defaultValue={data?.sku}
          color={errors.sku && "error"}
          helperText={errors.sku && errors.sku.message}
          {...register("sku", { required: false })}
        />

        <FloatingLabel
          label="Youtube URL"
          variant="outlined"
          type="url"
          id="video-id"
          defaultValue={data?.videoId}
          placeholder="video id"
          color={errors.videoId && "error"}
          helperText={errors.videoId && errors.videoId.message}
          {...register("videoId", { required: false })}
        />
      </div>
    </Card>
  );
}
