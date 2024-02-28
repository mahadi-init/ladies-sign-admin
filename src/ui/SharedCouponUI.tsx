"use client";
import ButtonGroup from "@/components/native/ButtonGroup";
import DropdownSelect from "@/components/native/DropdownSelect";
import ImageUploader from "@/components/native/ImageUploader";
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
    successMessage: string,
  ) => Promise<Response>;
}

export default function SharedCouponUI<T extends PropTypes>(props: T) {
  const [logo, setLogo] = useState(props.logo);
  const [productType, setProductType] = useState(
    props.productType ?? props.productTypes[0],
  );
  const handleFormAction = async (formData: FormData) => {
    const title = formData.get("title");
    const code = formData.get("code");
    const start = formData.get("start");
    const end = formData.get("end");
    const discountPercentage = formData.get("discount");
    const minimumAmount = formData.get("amount");
    const inactive = formData.get("inactive");
    //TODO:Test the result

    if (!logo) {
      toast.error("select an image");
      return;
    }

    //FIXME: check if endtime less than today
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
      status: inactive === "on" ? "inactive" : "active",
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
          Title <span className="text-red-600">*</span>
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
          Code <span className="text-red-600">*</span>
          <Input
            type="text"
            name="code"
            placeholder="Enter coupon code"
            defaultValue={props.couponCode}
            required
            className="mt-1 bg-gray-100"
          />
        </label>

        {/*FIXME:Date issue*/}
        <label className="ml-1 font-medium">
          Start Time
          <Input
            type="date"
            name="start"
            defaultValue={
              props.startTime &&
              new Date(props.startTime).toISOString().substring(0, 10)
            }
            className="mt-1 bg-gray-100"
          />
        </label>

        {/*FIXME:Date issue*/}
        <label className="ml-1 font-medium">
          End Time <span className="text-red-600">*</span>
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
          Discount Percentage <span className="text-red-600">*</span>
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
          Minimum amount <span className="text-red-600">*</span>
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
          Product Type <span className="text-red-600">*</span>
          <DropdownSelect
            name="productType"
            placeholder="Select Product Type"
            style="w-full mt-1 bg-gray-100"
            items={props.productTypes}
            selectedItem={productType}
            setSelectedItem={setProductType}
          />
        </label>

        <label className="ml-1 font-medium flex items-center gap-2">
          <Input
            type="checkbox"
            name="inactive"
            className="bg-gray-100 w-fit"
            defaultChecked={props.status === "Hide"}
          />
          Inactive <span className="text-xs text-red-600">(default show)</span>
        </label>

        <ButtonGroup />
      </div>
    </form>
  );
}
