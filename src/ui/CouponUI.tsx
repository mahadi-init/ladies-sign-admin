"use client";
import ButtonGroup from "@/components/native/ButtonGroup";
import ImageUploader from "@/components/native/ImageUploader";
import { Input } from "@/components/ui/input";
import useStatus from "@/hooks/useStatus";
import { fetcher } from "@/https/get-request";
import { CouponSchema, CouponType } from "@/types/coupon.t";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useSWR from "swr";

interface PropTypes extends CouponType {
  trigger: (arg: unknown) => Promise<{ success: boolean; message?: string }>;
  isMutating: boolean;
  successMessage: string;
}

export default function CouponUI(props: PropTypes) {
  const { data, error } = useSWR<string[]>(`/extra/all/product-types`, fetcher);
  const [image, setImage] = useState<string>();
  const { showStatus } = useStatus();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CouponType>({
    resolver: zodResolver(CouponSchema),
  });

  const onSubmit: SubmitHandler<CouponType> = async (data) => {
    const refinedData: CouponType = {
      ...data,
      img: image,
      status: image ? true : false,
    };

    const res = await props.trigger(refinedData);
    showStatus("/coupon", props.successMessage, res);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full xl:w-7/12">
      <ImageUploader image={image} setImage={setImage} folder="coupon" />

      <div className="flex flex-col gap-6 p-4">
        <label className="ml-1 font-medium">
          Title <span className="text-red-600">*</span>
          <Input
            type="text"
            placeholder="Enter title"
            defaultValue={props.name}
            className="mt-1 bg-gray-100"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-xs text-red-700">{errors.name.message}</span>
          )}
        </label>

        <label className="ml-1 font-medium">
          Code <span className="text-red-600">*</span>
          <Input
            type="text"
            placeholder="Enter coupon code"
            defaultValue={props.couponCode}
            className="mt-1 bg-gray-100"
            required
            {...register("couponCode")}
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
              props.startTime &&
              new Date(props.startTime).toISOString().substring(0, 10)
            }
            className="mt-1 bg-gray-100"
            required
            {...register("startTime")}
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
              props.endTime &&
              new Date(props.endTime).toISOString().substring(0, 10)
            }
            className="mt-1 bg-gray-100"
            required
            {...register("endTime")}
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
            defaultValue={props.discountPercentage}
            className="mt-1 bg-gray-100"
            required
            {...register("discountPercentage")}
          />
          {errors.discountPercentage && (
            <span className="text-xs text-red-700">
              {errors.discountPercentage.message}
            </span>
          )}
        </label>

        <label className="ml-1 font-medium">
          Minimum amount <span className="text-red-600">*</span>
          <Input
            type="number"
            placeholder="300"
            defaultValue={props.minimumAmount}
            className="mt-1 bg-gray-100"
            required
            {...register("minimumAmount")}
          />
          {errors.minimumAmount && (
            <span className="text-xs text-red-700">
              {errors.minimumAmount.message}
            </span>
          )}
        </label>
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
            required
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
