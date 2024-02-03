"use client";
import { useState } from "react";
import SubmitButton from "@/components/native/SubmitButton";
import DropdownSelect from "@/components/native/DropdownSelect";
import { Response } from "@/types/response";
import { useForm } from "react-hook-form";
import { CouponType } from "@/types/coupon";
import ImageUploader from "@/components/native/ImageUploader";
import { toast } from "sonner";

type Inputs = {
  title: string;
  couponCode: string;
  startTime: string;
  endTime: Date;
  discountPercentage: number;
  minimumAmount: number;
  productType: string;
};

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
  const { register } = useForm<Inputs>();
  const [logo, setLogo] = useState(props.logo);
  const [productType, setProductType] = useState(
    props.productType ?? props.productTypes[0],
  );

  const handleFormAction = async (formData: FormData) => {
    const title = formData.get("title");
    const code = formData.get("code");
    const startTime = formData.get("start");
    const endTime = formData.get("end");
    const discountPercentage = formData.get("discount");
    const minimumAmount = formData.get("amount");

    if (!logo) {
      toast.error("select an image");
      return;
    }

    const data = {
      _id: props._id,
      title: title,
      logo: logo,
      couponCode: code,
      startTime: startTime,
      endTime: endTime,
      discountPercentage: discountPercentage,
      minimumAmount: minimumAmount,
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
  };

  return (
    <form action={handleFormAction} className="w-full">
      <div className="flex flex-col justify-center items-center my-8 w-full">
        <ImageUploader image={logo} setImage={setLogo} />
      </div>

      <div className="flex flex-col gap-6 p-4">
        <label className="ml-1 font-medium">
          Title
          <input
            {...(register("title"), { required: true })}
            type="text"
            placeholder="Enter title"
            name="title"
            defaultValue={props.title}
            className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
          />
        </label>

        <label className="ml-1 font-medium">
          Code
          <input
            {...(register("couponCode"), { required: true })}
            type="text"
            name="code"
            placeholder="Enter coupon code"
            defaultValue={props.couponCode}
            className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
          />
        </label>

        <label className="ml-1 font-medium">
          Start Time
          <input
            {...(register("startTime"), { required: true })}
            type="date"
            name="start"
            defaultValue={
              props.startTime &&
              new Date(props.startTime).toISOString().substring(0, 10)
            }
            className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
          />
        </label>

        <label className="ml-1 font-medium">
          End Time
          <input
            {...(register("endTime"), { required: true })}
            type="date"
            name="end"
            defaultValue={
              props.endTime &&
              new Date(props.endTime).toISOString().substring(0, 10)
            }
            className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
          />
        </label>

        <label className="ml-1 font-medium">
          Discount Percentage
          <input
            {...(register("discountPercentage"), { required: true })}
            type="number"
            name="discount"
            placeholder="10"
            defaultValue={props.discountPercentage}
            className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
          />
        </label>

        <label className="ml-1 font-medium">
          Minimum amount
          <input
            {...(register("minimumAmount"), { required: true })}
            type="number"
            name="amount"
            placeholder="300"
            defaultValue={props.minimumAmount}
            className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
          />
        </label>

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

        <SubmitButton style="w-fit" />
      </div>
    </form>
  );
}
