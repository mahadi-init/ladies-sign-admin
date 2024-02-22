"use client";
import DropdownSelect from "@/components/native/DropdownSelect";
import ImageUploader from "@/components/native/ImageUploader";
import SubmitButton from "@/components/native/SubmitButton";
import { Input } from "@/components/ui/input";
import { CouponType } from "@/types/coupon";
import { Response } from "@/types/response";
import { useState } from "react";
import { toast } from "sonner";

interface PropTypes extends Partial<CouponType> {
  productTypes: string[];
  queryUrl: string;
  validationTag: string;
  successMessage: string;
  serverAction: <T>(
    data: T,
    queryUrl: string,
    validationTag: string,
    successMessage: string
  ) => Promise<Response>;
}

export default function SharedCouponUI<T extends PropTypes>(props: T) {
  const [logo, setLogo] = useState(props.logo);
  const [productType, setProductType] = useState(
    props.productType ?? props.productTypes[0]
  );
  const handleFormAction = async (formData: FormData) => {
    const title = formData.get("title");
    const code = formData.get("code");
    const start = formData.get("start");
    const end = formData.get("end");
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
      startTime: start,
      endTime: end,
      discountPercentage: discountPercentage,
      minimumAmount: minimumAmount,
      productType: productType,
    };

    const res = await props.serverAction(
      data,
      props.queryUrl,
      props.validationTag,
      props.successMessage
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
          <Input
            type="text"
            name="title"
            placeholder="Enter title"
            defaultValue={props.title}
            required
            className="mt-1 bg-gray-100"
          />
        </label>

        <label className="ml-1 font-medium">
          Code
          <Input
            type="text"
            name="code"
            placeholder="Enter coupon code"
            defaultValue={props.couponCode}
            required
            className="mt-1 bg-gray-100"
          />
        </label>

        <label className="ml-1 font-medium">
          Start Time
          <Input
            type="date"
            name="start"
            defaultValue={
              props.startTime &&
              new Date(props.startTime).toISOString().substring(0, 10)
            }
            required
            className="mt-1 bg-gray-100"
          />
        </label>

        <label className="ml-1 font-medium">
          End Time
          <Input
            type="date"
            name="end"
            defaultValue={
              props.endTime &&
              new Date(props.endTime).toISOString().substring(0, 10)
            }
            required
            className="mt-1 bg-gray-100"
          />
        </label>

        <label className="ml-1 font-medium">
          Discount Percentage
          <Input
            type="number"
            name="discount"
            placeholder="10"
            defaultValue={props.discountPercentage}
            required
            className="mt-1 bg-gray-100"
          />
        </label>

        <label className="ml-1 font-medium">
          Minimum amount
          <Input
            type="number"
            name="amount"
            placeholder="300"
            defaultValue={props.minimumAmount}
            required
            className="mt-1 bg-gray-100"
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
