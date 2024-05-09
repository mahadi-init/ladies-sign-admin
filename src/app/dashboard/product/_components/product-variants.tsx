import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { fetcher } from "@/https/get-request";
import { ExtraType } from "@/types/extra.t";
import { ProductType } from "@/types/product.t";
import { useUploadThing } from "@/utils/uploadthing";
import clsx from "clsx";
import { EyeIcon, EyeOffIcon, Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import useSWR from "swr";

export default function ProductVariants({
  setImages,
  setIsLoading,
}: {
  setImages: (arg0?: string[]) => void;
  setIsLoading: (arg0: boolean) => void;
}) {
  const { data } = useSWR<ExtraType>("/extra/all", fetcher);
  const { register, watch } = useFormContext<ProductType>();
  const [hideImages, setHideImages] = useState(false);
  const { fields, append, remove } = useFieldArray({
    name: "variants",
  });

  const { startUpload } = useUploadThing("product", {
    onClientUploadComplete: (res) => {
      toast.dismiss();
      toast.success("Image variants uploaded successfully");

      setImages(
        res.map((r) => {
          return r.url;
        }),
      );

      setIsLoading(false);
    },
    onUploadError: () => {
      toast.dismiss();
      toast.error("Image variants upload failed");
      setIsLoading(false);
    },
    onUploadBegin: () => {
      toast.dismiss();
      toast.loading("Image variants uploading...");
      setIsLoading(true);
    },
  });

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <div className="flex gap-2 justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Product Variants</h3>

        <div className="space-x-3 flex items-center">
          <a
            type="button"
            className={clsx(
              buttonVariants({ variant: "default" }),
              "ml-auto cursor-pointer",
            )}
            onClick={() => append({})}
          >
            Add Variants
          </a>
        </div>
      </div>

      {fields.map((field, index) => {
        return (
          <div key={field.id} className="w-full mt-4">
            {!hideImages && (
              <div className="w-full flex flex-col mb-6 items-center">
                <Image
                  src={
                    (watch(`variants.${index}.img`) &&
                      watch(`variants.${index}.img`)[0] &&
                      URL.createObjectURL(
                        watch(`variants.${index}.img`)[0] as any,
                      )) ??
                    "/logo.png"
                  }
                  height={200}
                  width={200}
                  alt="img"
                />
                <label
                  htmlFor={`img.${index}`}
                  className="flex flex-col justify-center items-center mx-auto mt-4 w-80 h-24 text-base text-black bg-white 
                rounded border-2 border-gray-300 border-dashed cursor-pointer font-[sans-serif]"
                >
                  <Upload />
                  Upload
                  <p className="mt-2 text-xs text-gray-400">
                    PNG, JPG SVG, WEBP, and GIF are Allowed.
                  </p>
                </label>
                <input
                  id={`img.${index}`}
                  type="file"
                  className="hidden"
                  {...register(`variants.${index}.img`)}
                />
              </div>
            )}

            <div className="grid items-center w-full grid-cols-1 gap-4 mb-6 lg:grid-cols-2 xl:grid-cols-5">
              <div className="flex items-center gap-4">
                <Image
                  src={
                    (watch(`variants.${index}.img`) &&
                      watch(`variants.${index}.img`)[0] &&
                      URL.createObjectURL(
                        watch(`variants.${index}.img`)[0] as any,
                      )) ??
                    "/logo.png"
                  }
                  height={64}
                  width={64}
                  alt="img"
                />

                <div className="w-full">
                  <Label
                    htmlFor="colorName"
                    className="block mb-1 text-sm font-medium"
                  >
                    Color Name <span className="text-red-600">*</span>
                  </Label>
                  <select
                    id="colorName"
                    key={field.id}
                    defaultValue={data?.colors?.[0].name}
                    className="mt-0.5 w-full p-2 bg-white rounded-md"
                    {...register(`variants.${index}.code`, { required: true })}
                  >
                    {data?.colors?.map((color, index) => {
                      return (
                        <option key={index} value={color.name}>
                          {color.name}
                        </option>
                      );
                    })}
                  </select>
                  <p className="mt-1 text-xs">enter color name. ex:green</p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="size"
                  className="block mb-1 text-sm font-medium"
                >
                  Sizes <span className="text-red-600">*</span>
                </label>
                <select
                  id="size"
                  key={field.id}
                  defaultValue={data?.sizes?.[0]}
                  className="mt-0.5 w-full p-2 bg-white rounded-md"
                  {...register(`variants.${index}.size`, { required: true })}
                >
                  {data?.sizes?.map((size) => {
                    return (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    );
                  })}
                </select>
                <p className="mt-1 text-xs">enter size.ex:XL</p>
              </div>

              <div>
                <label
                  htmlFor="quantity"
                  className="block mb-1 text-sm font-medium "
                >
                  Quantity <span className="text-red-600">*</span>
                </label>
                <Input
                  id="quantity"
                  key={field.id}
                  type="number"
                  placeholder="Quantity"
                  {...register(`variants.${index}.quantity`, {
                    required: true,
                  })}
                />
                <p className="mt-1 text-xs">Quantity with that color</p>
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="block mb-1 text-sm font-medium"
                >
                  Price <span className="text-red-600">*</span>
                </label>
                <Input
                  id="price"
                  key={field.id}
                  type="number"
                  placeholder="Price"
                  {...register(`variants.${index}.price`, { required: true })}
                />
                <p className="mt-1 text-xs">Quantity with that color</p>
              </div>

              <Button
                type="button"
                variant="destructive"
                onClick={() => remove(index)}
              >
                Remove
              </Button>
            </div>
          </div>
        );
      })}
      {fields.length > 0 && (
        <div className="flex justify-end">
          <div className="flex gap-8 items-center">
            <a
              type="button"
              className={clsx(
                buttonVariants({ variant: "outline" }),
                "ml-auto cursor-pointer ",
              )}
              onClick={() => setHideImages(!hideImages)}
            >
              {!hideImages ? (
                <EyeOffIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
              <span className="ml-1">Images</span>
            </a>
            <a
              type="button"
              className={clsx(
                buttonVariants({ variant: "default" }),
                "ml-auto cursor-pointer",
              )}
              onClick={() =>
                startUpload(
                  watch("variants")?.map((variant) => variant.img[0]) as [],
                )
              }
            >
              Upload All Images
            </a>
          </div>
        </div>
      )}
    </div>
  );
}