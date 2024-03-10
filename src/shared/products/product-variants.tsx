import ImageUploader from "@/components/native/ImageUploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ColorVariant {
  name: string;
  code: string;
  sizes: string;
  image?: string;
}

export default function ProductVariants() {
  const [colorVariants, setColorVariants] = useState<ColorVariant[]>([
    {
      name: "",
      code: "",
      sizes: "",
    },
  ]);

  const handleColorVariantChange = (
    index: number,
    fieldName: keyof ColorVariant,
    value: string,
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
          <div className="w-full flex flex-col items-center">
            {/* <ImageUploader image={variant.image} /> */}
          </div>
          <div className="mt-8 grid grid-cols-3 gap-6 mb-6">
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor={`color-name-${index}`}
              >
                Color Name
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
                Color Code
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
                Sizes
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
        onClick={() =>
          setColorVariants([
            ...colorVariants,
            { name: "", code: "", sizes: "" },
          ])
        }
      >
        Add Variants
      </Button>
    </div>
  );
}
