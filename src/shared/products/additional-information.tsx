import NonIconDropdownSelect from "@/components/native/NonIconDropdown";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Field {
  key: string;
  value: string;
}

export default function AdditionalInformation({
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

  const handleFieldChange = (
    index: number,
    fieldName: keyof Field,
    value: string
  ): void => {
    const updatedFields: Field[] = [...fields];
    updatedFields[index][fieldName] = value;
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
          <NonIconDropdownSelect
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
  );
}
