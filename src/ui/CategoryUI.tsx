"use client";
import ButtonGroup from "@/components/native/ButtonGroup";
import { ChipInput } from "@/components/native/ChipInput";
import ImageUploader from "@/components/native/ImageUploader";
import { Input } from "@/components/ui/input";
import useStatus from "@/hooks/useStatus";
import { fetcher } from "@/https/get-request";
import { CategorySchema, CategoryType } from "@/types/category.t";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";

interface PropTypes extends CategoryType {
  trigger: (arg: unknown) => Promise<{ success: boolean; message?: string }>;
  isMutating: boolean;
  successMessage: string;
}

export default function CategoryUI(props: PropTypes) {
  const { data, error } = useSWR<string[]>(`/extra/all/product-types`, fetcher);
  const [image, setImage] = useState<string>();
  const { showStatus } = useStatus();
  const [children, setChildren] = useState<string[]>(props.children ?? []);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CategoryType>({
    resolver: zodResolver(CategorySchema),
  });

  // reset & set form
  useEffect(() => {
    reset(props);
    setChildren(props.children ?? []);
  }, [reset, props, data]);

  const onSubmit: SubmitHandler<CategoryType> = async (data) => {
    const refinedData: CategoryType = {
      ...data,
      img: image,
      children: children,
    };

    const res = await props.trigger(refinedData);
    showStatus("/category", props.successMessage, res);
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
            className="mt-1 bg-gray-100"
            {...register("name", { required: true })}
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
            className="mt-0.5 w-full p-2.5 bg-gray-100 rounded-md"
            {...register("productType", { required: true })}
          >
            <option value={props.productType} selected disabled hidden>
              {props.productType ?? data?.[0]}
            </option>
            {data?.map((item) => {
              return (
                <option
                  hidden={
                    item.toLowerCase() === props.productType?.toLowerCase()
                  }
                  value={item}
                  key={item}
                >
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
