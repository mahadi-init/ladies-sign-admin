"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProductType } from "@/types/product.t";
import { useFormContext } from "react-hook-form";

export default function GeneralInformation({
  children,
}: {
  children: React.ReactNode;
}) {
  const { register } = useFormContext<ProductType>();

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow">
      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">General</h2>
        {children}
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="title">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              id="title"
              placeholder="Product Title"
              {...register("name", { required: true })}
            />
          </div>

          <div>
            <label
              className="block mb-1 text-sm font-medium"
              htmlFor="description"
            >
              Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              id="description"
              placeholder="Your Description"
              {...register("description", { required: true })}
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="price">
              Price <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              id="price"
              placeholder="Product price"
              {...register("price", { required: true })}
            />
            <p className="mt-1 text-xs text-gray-500">
              Set the base price of product.
            </p>
          </div>

          <div>
            <label
              className="block mb-1 text-sm font-medium"
              htmlFor="seller-discount"
            >
              Seller Price<span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              id="seller-discount"
              placeholder="Seller Discount"
              {...register("sellerPrice", { required: true })}
            />
            <p className="mt-1 text-xs text-gray-500">
              Set the seller Discount.
            </p>
          </div>

          <div>
            <label
              className="block mb-1 text-sm font-medium"
              htmlFor="quantity"
            >
              Quantity <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              id="quantity"
              placeholder="Quantity"
              {...register("quantity", { required: true })}
            />
            <p className="mt-1 text-xs text-gray-500">
              Enter the product quantity.
            </p>
          </div>

          <div>
            <label
              className="block mb-1 text-sm font-medium"
              htmlFor="discount"
            >
              Discount <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              id="discount"
              placeholder="Discount"
              {...register("discount", { required: true })}
            />
            <p className="mt-1 text-xs text-gray-500">
              Set the customer Discount.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-sm font-medium" htmlFor="sku">
            SKU
          </label>
          <Input
            type="text"
            id="sku"
            placeholder="SKU"
            {...register("sku", { required: false })}
          />
          <p className="mt-1 text-xs text-gray-500">Enter the product SKU.</p>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium" htmlFor="video-id">
            Youtube Video Id
          </label>
          <Input
            type="url"
            id="video-id"
            placeholder="video id"
            {...register("videoId", { required: false })}
          />
          <p className="mt-1 text-xs text-gray-500">
            Set the video id of product.
          </p>
        </div>

        {/* <div>
          <label
            className="block mb-1 text-sm font-medium"
            htmlFor="start-end-date"
          >
            Start And End Date
          </label>
          <Input
            type="date"
            id="start-end-date"
            placeholder="YYYY-MM-DD ~ YYYY-MM-DD"
          />
          <p className="mt-1 text-xs text-gray-500">
            set the product offer and end date
          </p>
        </div> */}
      </div>
    </div>
  );
}