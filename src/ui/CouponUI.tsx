"use client";
import ButtonGroup from "@/components/native/ButtonGroup";
import { ImageUploader } from "@/components/native/ImageUploader";
import { Input } from "@/components/ui/input";
import useStatus from "@/hooks/useStatus";
import { fetcher } from "@/https/get-request";
import { CouponSchema, CouponType } from "@/types/coupon.t";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWR from "swr";

interface PropTypes extends CouponType {
  trigger: (arg: unknown) => Promise<{ success: boolean; message?: string }>;
  isMutating: boolean;
  successMessage: string;
}

export default function CouponUI(props: PropTypes) {
  const { data } = useSWR<string[]>(`/extra/all/product-types`, fetcher);
  const [imgUrl, setImgUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const { showStatus } = useStatus();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CouponType>({
    resolver: zodResolver(CouponSchema),
  });

  useEffect(() => {
    reset({
      title: props.title,
      couponCode: props.couponCode,
      discountPercentage: props.discountPercentage,
      minimumAmount: props.minimumAmount,
      productType: props.productType,
    });
  }, [reset, props]);

  const onSubmit: SubmitHandler<CouponType> = async (data) => {
    if (isLoading) {
      toast.error("Please wait for image upload to complete");
      return;
    }

    if (data.startTime!! > data.endTime!!) {
      toast.error("Start time cannot be greater than end time");
      return;
    }

    const refinedData: CouponType = {
      ...data,
      img: imgUrl,
    };

    const res = await props.trigger(refinedData);
    showStatus("/coupon", props.successMessage, res);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full xl:w-7/12">
      <ImageUploader
        setIsLoading={setIsLoading}
        setImgUrl={setImgUrl}
        endpoint="coupon"
      />

      <div className="flex flex-col gap-6 p-4">
        <label className="ml-1 font-medium">
          Title <span className="text-red-600">*</span>
          <Input
            type="text"
            placeholder="Enter title"
            className="mt-1 bg-gray-100"
            {...register("title", { required: true })}
          />
          {errors.title && (
            <span className="text-xs text-red-700">{errors.title.message}</span>
          )}
        </label>

        <label className="ml-1 font-medium">
          Code <span className="text-red-600">*</span>
          <Input
            type="text"
            placeholder="Enter coupon code"
            className="mt-1 bg-gray-100"
            {...register("couponCode", { required: true })}
          />
          {errors.couponCode && (
            <span className="text-xs text-red-700">
              {errors.couponCode.message}
            </span>
          )}
        </label>

        <label className="ml-1 font-medium">
          Start Time <span className="text-red-600">*</span>
          <Input
            type="date"
            defaultValue={
              props.startTime
                ? props.startTime?.toString().split("T")[0]
                : new Date().toISOString().split("T")[0]
            }
            className="mt-1 bg-gray-100"
            {...register("startTime", { required: true })}
          />
          {errors.startTime && (
            <span className="text-xs text-red-700">
              {errors.startTime.message}
            </span>
          )}
        </label>

        <label className="ml-1 font-medium">
          End Time <span className="text-red-600">*</span>
          <Input
            type="date"
            defaultValue={
              props.endTime
                ? props.endTime?.toString().split("T")[0]
                : new Date().toISOString().split("T")[0]
            }
            className="mt-1 bg-gray-100"
            {...register("endTime", { required: true })}
          />
          {errors.endTime && (
            <span className="text-xs text-red-700">
              {errors.endTime.message}
            </span>
          )}
        </label>

        <label className="ml-1 font-medium">
          Discount Percentage <span className="text-red-600">*</span>
          <Input
            type="number"
            placeholder="10"
            className="mt-1 bg-gray-100"
            defaultValue={0}
            {...register("discountPercentage", { required: true })}
          />
          {errors.discountPercentage && (
            <span className="text-xs text-red-700">
              {errors.discountPercentage.message}
            </span>
          )}
        </label>

        <label className="ml-1 font-medium">
          Minimum amount
          <Input
            type="number"
            placeholder="300"
            className="mt-1 bg-gray-100"
            {...register("minimumAmount")}
          />
          {errors.minimumAmount && (
            <span className="text-xs text-red-700">
              {errors.minimumAmount.message}
            </span>
          )}
        </label>
        <label className="ml-1 font-medium" htmlFor="product-type">
          Product Type <span className="text-red-500">*</span>
          <select
            id="product-type"
            defaultValue={props.productType}
            className="mt-0.5 w-full p-2.5 bg-gray-100 rounded-md"
            {...register("productType", { required: true })}
          >
            {data?.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </label>
        <ButtonGroup isMutating={props.isMutating} />
      </div>
    </form>
  );
}
