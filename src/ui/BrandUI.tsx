"use client";
import ButtonGroup from "@/components/native/ButtonGroup";
import ImageUploader from "@/components/native/ImageUploader";
import { Input } from "@/components/ui/input";
import { BrandType } from "@/types/brand.t";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useSWRConfig } from "swr";

interface PropTypes extends Partial<BrandType> {
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
  } = useForm<BrandType>();

  const onSubmit: SubmitHandler<BrandType> = async (data) => {
    if (!data.status && !image) {
      toast.error("Select Inactive or enter an image");
      return;
    }

    const refinedData = {
      ...data,
      image: image,
      // false if inactive
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
        </label>

        <label className="ml-1 font-medium flex items-center gap-2">
          <Input
            type="checkbox"
            className="bg-gray-100 w-fit"
            defaultChecked={props.status ?? false}
            {...register("status")}
          />
          Inactive
          <span className="text-xs text-red-600">(default active)</span>
        </label>

        <ButtonGroup isMutating={props.isMutating} />
      </div>
    </form>
  );
}
