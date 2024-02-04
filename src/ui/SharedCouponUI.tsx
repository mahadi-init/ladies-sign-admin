"use client";
import { useState } from "react";
import SubmitButton from "@/components/native/SubmitButton";
import DropdownSelect from "@/components/native/DropdownSelect";
import { Response } from "@/types/response";
import { useForm } from "react-hook-form";
import { CouponType } from "@/types/coupon";
import ImageUploader from "@/components/native/ImageUploader";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ResetButton from "@/components/native/ResetButton";

const CouponSchema = z.object({
  title: z.string().min(2, "title is too short"),
  couponCode: z.string().min(3, "code is too short"),
  startTime: z.date(),
  endTime: z.date(),
  discountPercentage: z.number().nonnegative(),
  minimumAmount: z.number().nonnegative(),
  productType: z.string(),
});

interface PropTypes extends CouponType {
  productTypes: string[];
  queryUrl: string;
  validationTag: string;
  successMessage: string;
  serverAction: <T>(
    data: T,
    queryUrl: string,
    validationTag: string,
    successMessage: string,
  ) => Promise<Response>;
}

export default function SharedCouponUI<T extends PropTypes>(props: T) {
  const [pending, setPending] = useState(false);
  const [logo, setLogo] = useState(props.logo);
  const [productType, setProductType] = useState(
    props.productType ?? props.productTypes[0],
  );
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof CouponSchema>>({
    resolver: zodResolver(CouponSchema),
  });

  const handleFormAction = async (formData: z.infer<typeof CouponSchema>) => {
    if (!logo) {
      toast.error("select an image");
      return;
    }
    setPending(true);

    const data = {
      _id: props._id,
      title: formData.title,
      logo: logo,
      couponCode: formData.couponCode,
      startTime: formData.startTime,
      endTime: formData.endTime,
      discountPercentage: formData.discountPercentage,
      minimumAmount: formData.minimumAmount,
      productType: productType,
    };

    const res = await props.serverAction(
      data,
      props.queryUrl,
      props.validationTag,
      props.successMessage,
    );
    if (res.status === 200) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }

    setPending(false);
  };

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit((data) => handleFormAction(data))}
    >
      <div className="flex flex-col justify-center items-center my-8 w-full">
        <ImageUploader image={logo} setImage={setLogo} />
      </div>

      <div className="flex flex-col gap-6 p-4">
        <div>
          <label className="ml-1 font-medium">
            Title
            <input
              {...register("title")}
              type="text"
              placeholder="Enter title"
              name="title"
              defaultValue={props.title}
              required
              className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
            />
          </label>
          {errors.title?.message && (
            <span className="mt-1 text-xs text-red-700">
              {errors.title?.message}
            </span>
          )}
        </div>
        <div>
          <label className="ml-1 font-medium">
            Code
            <input
              {...register("couponCode")}
              type="text"
              name="code"
              placeholder="Enter coupon code"
              defaultValue={props.couponCode}
              required
              className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
            />
          </label>{" "}
          {errors.couponCode?.message && (
            <span className="mt-1 text-xs text-red-700">
              {errors.couponCode?.message}
            </span>
          )}
        </div>
        <div>
          <label className="ml-1 font-medium">
            Start Time
            <input
              {...register("startTime")}
              type="date"
              name="start"
              defaultValue={
                props.startTime &&
                new Date(props.startTime).toISOString().substring(0, 10)
              }
              required
              className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
            />
          </label>
          {errors.startTime?.message && (
            <span className="mt-1 text-xs text-red-700">
              {errors.startTime?.message}
            </span>
          )}
        </div>
        <div>
          <label className="ml-1 font-medium">
            End Time
            <input
              {...register("endTime")}
              type="date"
              name="end"
              defaultValue={
                props.endTime &&
                new Date(props.endTime).toISOString().substring(0, 10)
              }
              required
              className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
            />
          </label>
          {errors.endTime?.message && (
            <span className="mt-1 text-xs text-red-700">
              {errors.endTime?.message}
            </span>
          )}
        </div>
        <div>
          <label className="ml-1 font-medium">
            Discount Percentage
            <input
              {...register("discountPercentage")}
              type="number"
              name="discount"
              placeholder="10"
              defaultValue={props.discountPercentage}
              required
              className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
            />
          </label>
          {errors.discountPercentage?.message && (
            <span className="mt-1 text-xs text-red-700">
              {errors.discountPercentage?.message}
            </span>
          )}
        </div>
        <div>
          <label className="ml-1 font-medium">
            Minimum amount
            <input
              {...register("minimumAmount")}
              type="number"
              name="amount"
              placeholder="300"
              defaultValue={props.minimumAmount}
              required
              className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
            />
          </label>
          {errors.minimumAmount?.message && (
            <span className="mt-1 text-xs text-red-700">
              {errors.minimumAmount?.message}
            </span>
          )}
        </div>
        <label className="ml-1 font-medium">
          Product Type
          <DropdownSelect
            name="productType"
            placeholder="Select Product Type"
            style="w-full mt-1 bg-gray-100"
            items={props.productTypes}
            selectedItem={productType}
            setSelectedItem={setProductType}
          />
        </label>
        <div>
          <ResetButton action={() => reset()} />
          <SubmitButton pending={pending} style="w-fit" />
        </div>
      </div>
    </form>
  );
}
