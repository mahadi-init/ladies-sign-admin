"use client";
import ButtonGroup from "@/components/native/ButtonGroup";
import ImageUploader from "@/components/native/ImageUploader";
import { Input } from "@/components/ui/input";
import { BrandSchema, BrandType } from "@/types/brand.t";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

interface PropTypes extends BrandType {
  trigger: (arg: unknown) => Promise<{ success: boolean; message?: string }>;
  isMutating: boolean;
  successMessage: string;
}

export default function BrandUI(props: PropTypes) {
  const { mutate } = useSWRConfig();
  const [image, setImage] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BrandType>({
    resolver: zodResolver(BrandSchema),
  });

  const onSubmit: SubmitHandler<BrandType> = async (data) => {
    const refinedData: BrandType = {
      ...data,
      img: image,
      status: data.status ? false : true,
    };

    const result = await props.trigger(refinedData);

    if (result.success === true) {
      mutate(
        (key) => typeof key === "string" && key.startsWith("/brand"),
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
      <ImageUploader image={image} setImage={setImage} folder="brand" />

      <div className="flex flex-col gap-6">
        <label className="ml-1 font-medium">
          Name <span className="text-red-600">*</span>
          <Input
            type="text"
            placeholder="sony"
            defaultValue={props.name}
            className="mt-1 bg-gray-100"
            required
            {...register("name")}
          />
          {errors.name && (
            <span className="text-xs text-red-700">{errors.name.message}</span>
          )}
        </label>

        <label className="ml-1 font-medium">
          Email
          <Input
            type="email"
            placeholder="sony@gmail.com"
            defaultValue={props.email}
            className="mt-1 bg-gray-100"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-xs text-red-700">{errors.email.message}</span>
          )}
        </label>

        <label className="ml-1 font-medium">
          Location
          <Input
            type="text"
            placeholder="USA"
            defaultValue={props.location}
            className="mt-1 bg-gray-100"
            {...register("location")}
          />
          {errors.location && (
            <span className="text-xs text-red-700">
              {errors.location.message}
            </span>
          )}
        </label>
        <ButtonGroup isMutating={props.isMutating} />
      </div>
    </form>
  );
}
