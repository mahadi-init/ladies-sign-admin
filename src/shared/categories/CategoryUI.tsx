"use client";
import ButtonGroup from "@/components/native/ButtonGroup";
import ImageUploader from "@/components/native/ImageUploader";
import NonIconDropdownSelect from "@/components/native/NonIconDropdown";
import { Input } from "@/components/ui/input";
import { LocalResponse } from "@/types/response.t";
import { useState } from "react";
import { toast } from "sonner";
import { CategoryType } from "./category.t";

interface PropTypes extends Partial<CategoryType> {
  productTypes: string[];
  queryUrl: string;
  validationTag: string;
  successMessage: string;
  serverAction: <T>(
    data: T,
    queryUrl: string,
    validationTag: string,
    successMessage: string
  ) => Promise<LocalResponse>;
}

export default function CategoryUI<T extends PropTypes>(props: T) {
  const [img, setImg] = useState(props.img);
  const [productType, setProductType] = useState(
    props.productType ?? props.productTypes[0]
  );

  const handleFormAction = async (formData: FormData) => {
    const parent = formData.get("parent");
    const children = formData.get("children") as string;
    const hide = formData.get("hide");

    if (!img && !hide) {
      toast.error("hide or select an image");
      return;
    }

    const data = {
      _id: props._id,
      img: img,
      parent: parent,
      children: children.split(","),
      productType: productType,
      status: hide === "on" ? "Hide" : "Show",
    };

    const res = await props.serverAction(
      data,
      props.queryUrl,
      props.validationTag,
      props.successMessage
    );
    if (res.status === 200) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <form action={handleFormAction} className="w-full">
      <div className="flex flex-col justify-center items-center my-8 w-full">
        <ImageUploader image={img} setImage={setImg} />
      </div>

      <div className="flex flex-col gap-8 p-4">
        <label className="ml-1 font-medium">
          Parent <span className="text-red-600">*</span>
          <Input
            type="text"
            name="parent"
            placeholder="Headphones"
            defaultValue={props.parent}
            className="mt-1 bg-gray-100"
            required
          />
          <p className="text-xs ml-1 mt-1.5 italic">category name</p>
        </label>

        <label className="ml-1 font-medium">
          Children
          <textarea
            name="children"
            rows={2}
            placeholder="Kids Headphones,Bluetooth Headphones,On-Ear Headphones"
            defaultValue={props.children}
            className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
          />
          <p className="text-xs ml-1 italic">
            multiple comma separated children
          </p>
        </label>

        <label className="ml-1 font-medium">
          Product Type <span className="text-red-600">*</span>
          <NonIconDropdownSelect
            placeholder="Select Product Type"
            style="w-full mt-1 bg-gray-100"
            items={props.productTypes}
            selectedItem={productType}
            setSelectedItem={setProductType}
          />
        </label>

        <label className="ml-1 font-medium flex items-center gap-2">
          <Input
            type="checkbox"
            name="hide"
            className="bg-gray-100 w-fit"
            defaultChecked={props.status === "Hide"}
          />
          Hide <span className="text-xs text-red-600">(default show)</span>
        </label>

        <ButtonGroup />
      </div>
    </form>
  );
}
