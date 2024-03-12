import { HoverToolkit } from "@/components/native/HoverToolkit";
import NonIconDropdownSelect from "@/components/native/NonIconDropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Cross1Icon } from "@radix-ui/react-icons";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Field } from "./ProductUI";

export default function AdditionalInformation({
  productTypes,
  brands,
  selectedType,
  setSelectedType,
  selectedBrand,
  setSelectedBrand,
  fields,
  setFields,
}: {
  productTypes: string[];
  brands: string[];
  selectedType?: string;
  setSelectedType: (arg0?: string) => void;
  selectedBrand?: string;
  setSelectedBrand: (arg0?: string) => void;
  fields: Field[];
  setFields: (arg0: Field[]) => void;
}) {
  const [isCreateType, setIsCreateType] = useState(false);

  const handleFieldChange = (
    index: number,
    fieldName: keyof Field,
    value: string
  ): void => {
    const updatedFields: Field[] = [...fields];
    updatedFields[index][fieldName] = value;
    setFields(updatedFields);
  };

  //FIXME: HAVE ISSUE WITH THIS
  const removeElement = (index: number): void => {
    if (fields.length === 1) {
      return;
    }

    const updatedFields: Field[] = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  return (
    <div className="w-full p-6 bg-gray-100 rounded-lg shadow">
      <div className="grid grid-cols-3 gap-6 mb-6">
        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="productType"
          >
            ProductType <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2 items-center">
            {isCreateType ? (
              <>
                <Input
                  placeholder="crate new product type"
                  onChange={(e) => setSelectedType(e.target.value)}
                />
                <HoverToolkit text="Change to select">
                  <RefreshCcw
                    className="cursor-pointer"
                    onClick={() => setIsCreateType(false)}
                  />
                </HoverToolkit>
              </>
            ) : (
              <>
                <NonIconDropdownSelect
                  style="w-full"
                  placeholder="Select..."
                  items={productTypes}
                  selectedItem={selectedType}
                  setSelectedItem={setSelectedType}
                />
                <HoverToolkit text="Change to create">
                  <RefreshCcw
                    className="cursor-pointer"
                    onClick={() => setIsCreateType(true)}
                  />
                </HoverToolkit>
              </>
            )}
          </div>

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
          <NonIconDropdownSelect
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
          <Input type="text" id="unit" placeholder="Product unit" name="unit" />
          <p className="mt-2 text-sm text-gray-500">Set the unit of product.</p>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-900">
          Additional Information
        </h3>
        {fields.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-9 items-center gap-6 mt-4"
            >
              <div className="col-span-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor={`key${index}`}
                >
                  Key <span className="text-red-600">*</span>
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
              <div className="col-span-4">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor={`value${index}`}
                >
                  Value <span className="text-red-600">*</span>
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
              <Button
                type="button"
                className="mt-5 rounded-full w-fit col-span-1"
                variant="destructive"
                size="sm"
                onClick={() => removeElement(index)}
              >
                {index}
                <Cross1Icon />
              </Button>
            </div>
          );
        })}
        <div className="mt-4">
          <Button
            type="button"
            onClick={() => {
              if (fields.some((field) => !field.key || !field.value)) {
                toast.error("Some options are empty");
                return;
              }
              setFields([...fields, {}]);
            }}
          >
            Add Field
          </Button>
        </div>
      </div>
    </div>
  );
}
