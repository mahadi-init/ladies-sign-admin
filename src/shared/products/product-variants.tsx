import ImageUploader from "@/components/native/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { ColorVariant } from "./ProductUI";

export default function ProductVariants({
  colorVariants,
  setColorVariants,
}: {
  colorVariants: ColorVariant[];
  setColorVariants: (arg0: ColorVariant[]) => void;
}) {
  const [image, setImage] = useState<string>();

  const handleImageChange = (index: number, image?: string) => {
    const updatedColorVariants = [...colorVariants];
    updatedColorVariants[index].img = image;
    setColorVariants(updatedColorVariants);
  };

  const handleColorVariantChange = (
    index: number,
    fieldName: keyof ColorVariant,
    value: string
  ) => {
    const updatedColorVariants = [...colorVariants];
    updatedColorVariants[index][fieldName] = value;
    setColorVariants(updatedColorVariants);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Product Variations</h1>
      <hr className="mb-6" />
      {colorVariants.map((variant, index) => (
        <div key={index}>
          <div className="flex flex-col items-center">
            <ImageUploader
              image={variant.img}
              setImage={setImage}
              index={index}
              action={handleImageChange}
            />
          </div>
          <div className="mt-8 grid grid-cols-3 gap-6 mb-6">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor={`color-name-${index}`}
              >
                Color Name <span className="text-red-600">*</span>
              </label>
              <Input
                id={`color-name-${index}`}
                placeholder="Color Name"
                value={variant.name}
                onChange={(e) =>
                  handleColorVariantChange(index, "name", e.target.value)
                }
              />
              <p className="text-xs mt-1">Set the Color name of product.</p>
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor={`color-code-${index}`}
              >
                Color Code <span className="text-red-600">*</span>
              </label>
              <Input
                id={`color-code-${index}`}
                placeholder="Color Code"
                value={variant.code}
                onChange={(e) =>
                  handleColorVariantChange(index, "code", e.target.value)
                }
              />
              <p className="text-xs mt-1">Hex code here ex:#3C3C3D</p>
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor={`sizes-${index}`}
              >
                Sizes <span className="text-red-600">*</span>
              </label>
              <Input
                id={`sizes-${index}`}
                placeholder="XL,2XL,3XL"
                value={variant.sizes}
                onChange={(e) =>
                  handleColorVariantChange(index, "sizes", e.target.value)
                }
              />
              <p className="text-xs mt-1">enter all sizes (comma separated)</p>
            </div>
          </div>
          {colorVariants.length > 1 && (
            <hr className="mb-6 border-spacing-1.5 border-gray-600" />
          )}
        </div>
      ))}
      <Button
        type="button"
        className="mt-4"
        onClick={() => {
          if (!image) {
            toast.error("image can't be empty");
            return;
          }

          if (
            colorVariants.some(
              (variant) =>
                !variant.name || !variant.code || !variant.sizes || !variant.img
            )
          ) {
            toast.error("Some options are empty");
            return;
          }

          setColorVariants([...colorVariants, {}]);
        }}
      >
        Add Variants
      </Button>
    </div>
  );
}
