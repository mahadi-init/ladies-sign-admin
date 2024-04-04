"use client";
import ButtonGroup from "@/components/native/ButtonGroup";
import { Input } from "@/components/ui/input";
import { CouponType } from "@/types/coupon.t";

interface PropTypes extends Partial<CouponType> {}

export default function CouponUI(props: PropTypes) {
  return (
    <form className="w-full xl:w-7/12">
      <div className="flex flex-col justify-center items-center my-8 w-full">
        {/* <FormImageUploader name="logo" image={props.logo} /> */}
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

        <label className="ml-1 font-medium">
          Start Time <span className="text-red-600">*</span>
          <Input
            type="date"
            name="start"
            defaultValue={
              props.startTime &&
              new Date(props.startTime).toISOString().substring(0, 10)
            }
            className="mt-1 bg-gray-100"
            required
          />
        </label>

        <label className="ml-1 font-medium">
          End Time <span className="text-red-600">*</span>
          <Input
            type="date"
            name="end"
            defaultValue={
              props.endTime &&
              new Date(props.endTime).toISOString().substring(0, 10)
            }
            className="mt-1 bg-gray-100"
            required
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

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="product-type"
          >
            Product Type <span className="text-red-500">*</span>
          </label>
          <select
            name="product-type"
            id="product-type"
            // defaultValue={props.productType ?? props.productTypes[0]}
            className="mt-0.5 w-full p-2 bg-gray-100 rounded-md"
          >
            {/* {props.productTypes?.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })} */}
          </select>
          <p className="mt-2 text-sm text-gray-500">Set the Product Type</p>
        </div>

        <label className="ml-1 font-medium flex items-center gap-2">
          <Input
            type="checkbox"
            name="inactive"
            className="bg-gray-100 w-fit"
            defaultChecked={props.status === "INACTIVE"}
          />
          Inactive <span className="text-xs text-red-600">(default show)</span>
        </label>

        <ButtonGroup />
      </div>
    </form>
  );
}
