"use client";
import { ChangeEvent, useState } from "react";
import { Upload } from "lucide-react";
import { addCategory, getImageUrl } from "./_action";
import SubmitButton from "@/components/native/SubmitButton";
import { useStatusContext } from "@/contexts/status-context";
import { Status } from "@/types/status";
import DropdownSelect from "@/components/native/DropdownSelect";

export default function AddCategory({
  productTypes,
}: {
  productTypes: string[];
}) {
  const { setStatus } = useStatusContext("Category Add");
  const [image, setImage] = useState<string>();
  const [selectedProductType, setSelectedProductType] = useState<string>(
    productTypes[0]
  );

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const objectUrl = URL.createObjectURL(e.target.files[0]);
      setImage(objectUrl);
    }
  };

  const handleFormAction = async (formData: FormData) => {
    // const imageRes = await getImageUrl(formData);

    const parent = formData.get("parent");
    const children = formData.get("children") as string;
    const productType = formData.get("productType");
    const description = formData.get("description");

    const data = {
      img: "", //TODO:CHNAGE
      parent: parent,
      children: children.split(","),
      productType: productType,
      description: description,
    };

    const res = await addCategory(data);

    if (res) {
      setStatus(Status.SUCCESS);
    } else {
      setStatus(Status.ERROR);
    }
  };

  return (
    <form action={handleFormAction}>
      <div className="flex flex-col items-center my-8 w-full">
        <picture>
          <img
            src={image ?? "/logo.png"}
            className="w-64 rounded-md"
            height={400}
            width={400}
            alt="upload"
          />
        </picture>

        <label
          htmlFor="uploadFile1"
          className="flex flex-col justify-center items-center mx-auto mt-4 w-80 h-24 text-base text-black bg-white rounded border-2 border-gray-300 border-dashed cursor-pointer font-[sans-serif]"
        >
          <Upload />
          Upload file
          <input
            type="file"
            id="uploadFile1"
            className="hidden"
            onChange={handleFileChange}
            name="image"
          />
          <p className="mt-2 text-xs text-gray-400">
            PNG, JPG SVG, WEBP, and GIF are Allowed.
          </p>
        </label>
      </div>
      <div className="lg:ml-72  p-4 flex flex-col gap-4">
        <label className="ml-1 font-medium">
          Parent
          <input
            type="text"
            name="parent"
            placeholder="Name"
            required
            className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
          />
        </label>
        <label className="ml-1 font-medium">
          Children
          <textarea
            name="children"
            placeholder="Enter multiple comma separated childrens"
            required
            className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
          />
        </label>
        <label className="ml-1 font-medium">
          Product Type
          <DropdownSelect
            name="productType"
            placeholder="Select Product Type"
            style="w-full mt-1 bg-gray-100"
            items={productTypes}
            selectedItem={selectedProductType}
            setSelectedItem={setSelectedProductType}
          />
        </label>
        <label className="ml-1 font-medium">
          Description
          <textarea
            name="description"
            placeholder="Enter description"
            required
            className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
          />
        </label>

        <SubmitButton style="w-fit" />
      </div>
    </form>
  );
}
