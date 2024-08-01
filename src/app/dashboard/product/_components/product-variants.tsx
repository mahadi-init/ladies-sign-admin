import { ProductSchema, ProductType } from "@/types/product";
import { useUploadThing } from "@/utils/uploadthing";
import clsx from "clsx";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { EyeIcon, EyeOffIcon, Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const variantSchema = ProductSchema.pick({ variants: true });
type VariantType = z.infer<typeof variantSchema>;

export default function ProductVariants({
  setImages,
  setIsLoading,
  variantsData,
}: {
  setImages: (arg0?: string[]) => void;
  setIsLoading: (arg0: boolean) => void;
  variantsData?: VariantType;
}) {
  const [colors, setColors] = useState<{ name: string; code: string }[]>();
  const [sizes, setSizes] = useState<string[]>();
  const { register, watch } = useFormContext<ProductType>();
  const [hideImages, setHideImages] = useState(false);
  const { fields, append, remove } = useFieldArray({
    name: "variants",
  });

  useEffect(() => {
    const colors = localStorage.getItem("colors");
    const sizes = localStorage.getItem("sizes");

    if (colors) {
      setColors(JSON.parse(colors));
    }

    if (sizes) {
      setSizes(JSON.parse(sizes));
    }
  }, []);

  useEffect(() => {
    if (variantsData) {
      variantsData?.variants?.map((item: any) => {
        append({
          color: item.color,
          img: item.img,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
          sellerPrice: item.sellerPrice,
        });
      });
    } else {
      append({
        color: null,
        size: null,
        quantity: null,
        price: null,
        sellerPrice: null,
      });
    }
  }, [append, variantsData]);

  const getImage = (index: number) => {
    if (typeof watch(`variants.${index}.img`) === "string") {
      return watch(`variants.${index}.img`);
    } else if (
      watch(`variants.${index}.img`) &&
      watch(`variants.${index}.img`)[0]
    ) {
      return URL.createObjectURL(watch(`variants.${index}.img`)[0] as any);
    } else {
      return "/logo.png";
    }
  };

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
    <Card>
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-medium text-gray-900">Product Variants</h3>

        <div className="flex items-center space-x-3">
          <Button
            type="button"
            className={clsx("ml-auto cursor-pointer")}
            onClick={() => append({})}
          >
            Add Variants
          </Button>
        </div>
      </div>

      {fields.map((field, index) => {
        return (
          <div key={field.id} className="mt-4 w-full">
            {!hideImages && (
              <div className="mb-6 flex w-full flex-col items-center">
                <Image
                  src={getImage(index)}
                  height={200}
                  width={200}
                  alt="img"
                />
                <label
                  htmlFor={`img.${index}`}
                  className="mx-auto mt-4 flex h-24 w-80 cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 bg-white font-[sans-serif] text-base text-black"
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

            <div className="mb-6 grid w-full grid-cols-1 items-center gap-4 lg:grid-cols-3 xl:grid-cols-6">
              <div className="flex items-center gap-4">
                <Image src={getImage(index)} height={64} width={64} alt="img" />

                <div className="w-full">
                  <div className="-mt-2">
                    <Label htmlFor="name" value="Color Name *" />
                  </div>
                  <select
                    id="name"
                    key={field.id}
                    defaultValue={colors?.[0]?.name}
                    className="mt-0.5 w-full rounded-md"
                    {...register(`variants.${index}.color`, { required: true })}
                  >
                    {colors?.map((color, index) => {
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

              <div className="-mt-2">
                <div className="mb-1">
                  <Label htmlFor="size" value="Size *" />
                </div>
                <select
                  id="size"
                  key={field.id}
                  defaultValue={sizes?.[0]}
                  className="w-full rounded-md"
                  {...register(`variants.${index}.size`, { required: true })}
                >
                  {sizes?.map((size) => {
                    return (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    );
                  })}
                </select>
                <p className="mt-1 text-xs">enter size.ex:XL</p>
              </div>

              <div className="block">
                <div className="mb-1">
                  <Label htmlFor="quantity" value="Quantity *" />
                </div>
                <TextInput
                  id="quantity"
                  key={field.id}
                  type="number"
                  placeholder="Enter quantity"
                  helperText={"Quantity with that color"}
                  {...register(`variants.${index}.quantity`, {
                    required: true,
                  })}
                />
              </div>

              <div className="block">
                <div className="mb-1">
                  <Label htmlFor="price" value="Price *" />
                </div>
                <TextInput
                  id="price"
                  key={field.id}
                  type="number"
                  placeholder="Price"
                  helperText={"variant price"}
                  {...register(`variants.${index}.price`, { required: true })}
                />
              </div>

              <div>
                <div className="mb-1">
                  <Label htmlFor="price" value="Price *" />
                </div>
                <TextInput
                  id="price"
                  key={field.id}
                  type="number"
                  placeholder="Seller Price"
                  helperText={"Price for the sellers"}
                  {...register(`variants.${index}.sellerPrice`, {
                    required: true,
                  })}
                />
              </div>

              <Button
                type="button"
                color="failure"
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
          <div className="flex items-center gap-8">
            <Button
              type="button"
              color="light"
              className={clsx("ml-auto cursor-pointer")}
              onClick={() => setHideImages(!hideImages)}
            >
              {!hideImages ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
              <span className="ml-1">Images</span>
            </Button>
            <Button
              type="button"
              color="success"
              className={clsx("ml-auto cursor-pointer")}
              onClick={async () => {
                let count = 0;

                const images = watch("variants")?.map((variant) => {
                  console.log(typeof variant.img);
                  if (typeof variant.img !== "string") {
                    count++;
                    return variant.img[0];
                  }
                }) as [];

                if (count === 0) {
                  return;
                }

                await startUpload(images);
              }}
            >
              Upload All Images
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
