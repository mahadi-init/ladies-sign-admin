"use client";
import ButtonGroup from "@/components/native/ButtonGroup";
import DropdownSelect from "@/components/native/DropdownSelect";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

interface Field {
  key: string;
  value: string;
}

interface ColorVariant {
  name: string;
  code: string;
  sizes: string;
}

export default function SharedProductUI({
  productTypes,
  brands,
}: {
  productTypes: string[];
  brands: string[];
}) {
  const [selectedType, setSelectedType] = useState<string>();
  const [selectedBrand, setSelectedBrand] = useState<string>();
  const [fields, setFields] = useState([
    {
      key: "",
      value: "",
    },
  ]);
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
    value: string
  ) => {
    const updatedColorVariants = [...colorVariants];
    updatedColorVariants[index][fieldName] = value;
    setColorVariants(updatedColorVariants);
  };

  const handleFieldChange = (
    index: number,
    fieldName: keyof Field,
    value: string
  ): void => {
    const updatedFields: Field[] = [...fields];
    updatedFields[index][fieldName] = value;
    setFields(updatedFields);
  };

  const handleFormAction = (formData: FormData) => {
    const title = formData.get("title");
    const description = formData.get("description");
    const price = formData.get("price");
    const sku = formData.get("sku");
    const quantity = formData.get("quantity");
    const discount = formData.get("discount");
    const video = formData.get("video");

    console.log(title, description, price, sku, quantity, discount, video);
  };

  return (
    <form action={handleFormAction} className="w-full flex flex-col gap-4 mb-4">
      {/* Input 1 starts here */}
      <div className="p-6 bg-gray-100 rounded-lg shadow">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">General</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="title">
                Title <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                id="title"
                placeholder="Product Title"
                name="title"
                required
              />
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="description"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="description"
                placeholder="Your Description"
                name="description"
                required
              />
            </div>
          </div>
        </div>
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="price">
                Price <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                id="price"
                placeholder="Product price"
                name="price"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Set the base price of product.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="sku">
                SKU
              </label>
              <Input type="text" id="sku" placeholder="SKU" name="sku" />
              <p className="text-xs text-gray-500 mt-1">
                Enter the product SKU.
              </p>
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="quantity"
              >
                Quantity <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                id="quantity"
                placeholder="Quantity"
                name="quantity"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter the product quantity.
              </p>
            </div>
            <div>
              <label
                className="block text-sm font-medium mb-1"
                htmlFor="discount"
              >
                Discount Percentage <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                id="discount"
                placeholder="Discount"
                name="discount"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Set the customer Discount.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="seller-discount"
            >
              Seller Percentage <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              id="seller-discount"
              placeholder="Seller Discount"
              name="seller-discount"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Set the seller Discount.
            </p>
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="video-id"
            >
              Youtube Video Id
            </label>
            <Input
              type="url"
              id="video-id"
              placeholder="video id"
              name="video"
            />
            <p className="text-xs text-gray-500 mt-1">
              Set the video id of product.
            </p>
          </div>
          {/* <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="start-end-date"
            >
              Start And End Date
            </label>
            <Input
              type="date"
              id="start-end-date"
              placeholder="YYYY-MM-DD ~ YYYY-MM-DD"
            />
            <p className="text-xs text-gray-500 mt-1">
              set the product offer and end date
            </p>
          </div> */}
        </div>
      </div>
      {/*Input 1 ends here */}

      {/* Input 2 starts here */}
      <div className="w-full p-6 bg-gray-100 rounded-lg shadow">
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="productType"
            >
              ProductType <span className="text-red-500">*</span>
            </label>
            <DropdownSelect
              style="w-full"
              placeholder="Select..."
              items={productTypes}
              selectedItem={selectedType}
              setSelectedItem={setSelectedType}
            />

            <p className="mt-2 text-sm text-gray-500">
              Set the product ProductType.
            </p>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="brands"
            >
              Brand <span className="text-red-500">*</span>
            </label>
            <DropdownSelect
              style="w-full"
              placeholder="Select..."
              items={brands}
              selectedItem={selectedBrand}
              setSelectedItem={setSelectedBrand}
            />
            <p className="mt-2 text-sm text-gray-500">Set the product Brand.</p>
          </div>
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="unit"
            >
              Unit <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              id="unit"
              placeholder="Product unit"
              name="unit"
            />
            <p className="mt-2 text-sm text-gray-500">
              Set the unit of product.
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium text-gray-900">
            Additional Information
          </h3>
          {fields.map((item, index) => {
            return (
              <div key={index} className="grid grid-cols-2 gap-6 mt-4">
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor={`key${index}`}
                  >
                    Key
                  </label>
                  <Input
                    id={`key${index}`}
                    placeholder="Enter key"
                    name={item.key}
                    value={item.key}
                    onChange={(e) =>
                      handleFieldChange(index, "key", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium text-gray-700"
                    htmlFor={`value${index}`}
                  >
                    Value
                  </label>
                  <Input
                    id={`value${index}`}
                    placeholder="Enter value"
                    name={item.value}
                    value={item.value}
                    onChange={(e) =>
                      handleFieldChange(index, "value", e.target.value)
                    }
                  />
                </div>
              </div>
            );
          })}
          <div className="mt-4">
            <Button
              type="button"
              onClick={() => {
                setFields([...fields, { key: "", value: "" }]);
              }}
            >
              Add Field
            </Button>
          </div>
        </div>
      </div>
      {/* Input 2 ends here */}

      {/* Input 3 starts here */}
      <div className="p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Product Variations</h1>
        <hr className="mb-6" />
        {colorVariants.map((variant, index) => (
          <div key={index}>
            <div className="w-full flex flex-col items-center">
              {/* <ImageUploader /> */}
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
                <p className="text-xs mt-1">
                  enter all sizes (comma separated)
                </p>
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
      {/* Input 3 ends here */}

      <ButtonGroup />
    </form>
  );
}
