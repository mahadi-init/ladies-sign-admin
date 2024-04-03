"use client";
import { ChipInput } from "@/components/chip-input";
import ButtonGroup from "@/components/native/ButtonGroup";
import ImageUploader from "@/components/native/ImageUploader";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/https/get-request";
import { CategorySchema, CategoryType } from "@/types/category.t";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWR, { useSWRConfig } from "swr";

interface PropTypes extends CategoryType {
  trigger: (arg: unknown) => Promise<{ success: boolean; message?: string }>;
  isMutating: boolean;
  successMessage: string;
}

export default function CategoryUI(props: PropTypes) {
  const { mutate } = useSWRConfig();
  const { data, error } = useSWR<string[]>(`/product/all/types`, fetcher);
  const [image, setImage] = useState<string>();
  const [children, setChildren] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryType>({
    resolver: zodResolver(CategorySchema),
  });

  const onSubmit: SubmitHandler<CategoryType> = async (data) => {
    const refinedData: CategoryType = {
      ...data,
      img: image,
      children: children,
    };

    const result = await props.trigger(refinedData);

    if (result.success === true) {
      mutate(
        (key) => typeof key === "string" && key.startsWith("/category"),
        undefined,
        { revalidate: true }
      );
      toast.success(props.successMessage);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full xl:w-7/12">
      <ImageUploader image={image} setImage={setImage} folder="category" />

      <div className="flex flex-col gap-8 p-4">
        <label className="ml-1 font-medium">
          Name <span className="text-red-600">*</span>
          <Input
            type="text"
            placeholder="Headphones"
            defaultValue={props.name}
            className="mt-1 bg-gray-100"
            required
            {...register("name")}
          />
          {errors.name && (
            <span className="text-xs text-red-700">{errors.name.message}</span>
          )}
        </label>
        <ChipInput items={children} setItems={setChildren} />
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="product-type"
          >
            Product Type <span className="text-red-500">*</span>
          </label>
          <select
            id="product-type"
            defaultValue={props.productType ?? !error ? data?.[0] : undefined}
            className="mt-0.5 w-full p-2.5 bg-gray-100 rounded-md"
            {...register("productType")}
          >
            {data?.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <p className="mt-2 text-sm text-gray-500">Set the product type</p>
        </div>
        <ButtonGroup isMutating={props.isMutating} />
      </div>
    </form>
  );
}
