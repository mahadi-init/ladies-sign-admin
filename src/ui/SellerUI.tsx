"use client";
import ButtonGroup from "@/components/native/ButtonGroup";
import { ImageUploader } from "@/components/native/ImageUploader";
import { Input } from "@/components/ui/input";
import useStatus from "@/hooks/useStatus";
import { SellerSchema, SellerType } from "@/types/seller.t";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface PropTypes extends SellerType {
  trigger: (arg: unknown) => Promise<{ success: boolean; message?: string }>;
  isMutating: boolean;
  successMessage: string;
}

export default function SellerUI(props: PropTypes) {
  const [imgUrl, setImgUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const { showStatus } = useStatus();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SellerType>({
    resolver: zodResolver(SellerSchema),
  });

  useEffect(() => {
    reset(props);
  }, [reset, props]);

  const onSubmit: SubmitHandler<SellerType> = async (data) => {
    if (isLoading) {
      toast.error("Please wait for image upload to complete");
      return;
    }

    const refinedData: SellerType = {
      ...data,
      img: imgUrl,
    };

    const res = await props.trigger(refinedData);
    showStatus("/seller", props.successMessage, res);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full xl:w-7/12">
      <ImageUploader
        setIsLoading={setIsLoading}
        setImgUrl={setImgUrl}
        endpoint="seller"
      />

      <div className="flex flex-col gap-6 p-4">
        <label className="ml-1 font-medium">
          Name <span className="text-red-600">*</span>
          <Input
            type="text"
            placeholder="Jhon Doe"
            className="mt-1 bg-gray-100"
            {...register("name", { required: true })}
          />
          {errors.name && (
            <span className="text-xs text-red-700">{errors.name.message}</span>
          )}
        </label>

        <label className="ml-1 font-medium">
          Email
          <Input
            type="text"
            placeholder="xyz@gmail.com"
            className="mt-1 bg-gray-100"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-xs text-red-700">{errors.email.message}</span>
          )}
        </label>

        <label className="ml-1 font-medium">
          Phone <span className="text-red-600">*</span>
          <Input
            type="text"
            placeholder="01712345678"
            className="mt-1 bg-gray-100"
            {...register("phone", { required: true })}
          />
          {errors.phone && (
            <span className="text-xs text-red-700">{errors.phone.message}</span>
          )}
        </label>

        <label className="ml-1 font-medium">
          Whatsapp <span className="text-red-600">*</span>
          <Input
            type="text"
            placeholder="01712345678"
            className="mt-1 bg-gray-100"
            {...register("whatsapp", { required: true })}
          />
          {errors.whatsapp && (
            <span className="text-xs text-red-700">
              {errors.whatsapp.message}
            </span>
          )}
        </label>

        <label className="ml-1 font-medium">
          Password <span className="text-red-600">*</span>
          <Input
            type="text"
            placeholder="624234"
            className="mt-1 bg-gray-100"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-xs text-red-700">
              {errors.password.message}
            </span>
          )}
        </label>

        <label className="ml-1 font-medium">
          Address <span className="text-red-600">*</span>
          <Input
            type="text"
            className="mt-1 bg-gray-100"
            placeholder="Dhanmondi, 32"
            {...register("address", { required: true })}
          />
          {errors.address && (
            <span className="text-xs text-red-700">
              {errors.address.message}
            </span>
          )}
        </label>

        <label className="ml-1 font-medium">
          Facebook Profile<span className="text-red-600">*</span>
          <Input
            type="text"
            placeholder="http://facebook.com/profile"
            className="mt-1 bg-gray-100"
            {...register("facebookProfile", { required: true })}
          />
          {errors.facebookProfile && (
            <span className="text-xs text-red-700">
              {errors.facebookProfile.message}
            </span>
          )}
        </label>

        <label className="ml-1 font-medium">
          Facebook Page
          <Input
            type="text"
            placeholder="http://facebook.com/page"
            className="mt-1 bg-gray-100"
            {...register("facebookPage")}
          />
          {errors.facebookPage && (
            <span className="text-xs text-red-700">
              {errors.facebookPage.message}
            </span>
          )}
        </label>

        <ButtonGroup isMutating={props.isMutating} />
      </div>
    </form>
  );
}
