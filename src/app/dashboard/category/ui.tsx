"use client";
import { useState } from "react";
import SubmitButton from "@/components/native/SubmitButton";
import DropdownSelect from "@/components/native/DropdownSelect";
import { Response } from "@/types/response";
import { useForm } from "react-hook-form";
import { CategoryType } from "@/types/category";
import { toast } from "sonner";
import ImageUploader from "@/components/native/ImageUploader";

type Inputs = {
  parent: string;
  children: string;
  visibility: boolean;
};

interface PropTypes extends CategoryType {
  productTypes: string[];
  queryUrl: string;
  validationTag: string;
  successMessage: string;
  serverAction: <T>(
    data: T,
    queryUrl: string,
    validationTag: string,
    successMessage: string,
  ) => Promise<Response>;
}

export default function SharedCategoryUI<T extends PropTypes>(props: T) {
  const { register } = useForm<Inputs>();
  const [img, setImg] = useState(props.img);
  const [selectedProductType, setSelectedProductType] = useState(
    props.productType ?? props.productTypes[0],
  );

  const handleFormAction = async (formData: FormData) => {
    const parent = formData.get("parent");
    const children = formData.get("children") as string;
    const productType = formData.get("productType");
    const visibility = formData.get("visibility");

    //FIXME: FIX THE visibility issue
    if (!img && visibility) {
      toast.error("hide or select an image");
      return;
    }

    const data = {
      _id: props._id,
      img: img,
      parent: parent,
      children: children.split(","),
      status: visibility ? "Show" : "Hide",
      productType: productType,
    };

    const res = await props.serverAction(
      data,
      props.queryUrl,
      props.validationTag,
      props.successMessage,
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

      <div className="flex flex-col gap-6 p-4">
        <label className="ml-1 font-medium">
          Parent
          <input
            {...(register("parent"), { required: true })}
            type="text"
            placeholder="Enter parent name"
            name="parent"
            defaultValue={props.parent}
            className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
          />
        </label>

        <label className="ml-1 font-medium">
          Children
          <textarea
            {...register("parent")}
            name="children"
            rows={2}
            placeholder="Enter multiple comma separated children"
            defaultValue={props.children}
            className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
          />
        </label>

        <label className="ml-1 font-medium">
          Product Type
          <DropdownSelect
            name="productType"
            placeholder="Select Product Type"
            style="w-full mt-1 bg-gray-100"
            items={props.productTypes}
            selectedItem={selectedProductType}
            setSelectedItem={setSelectedProductType}
          />
        </label>

        <div className="flex items-center">
          <label className="relative mr-4 cursor-pointer">
            <input
              {...register("visibility")}
              name="visibility"
              type="checkbox"
              defaultValue={props.status}
              className="sr-only peer"
            />
            <div className="w-11 h-6 flex items-center bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007bff]"></div>
          </label>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-300">
            Show category in preview
          </p>
        </div>

        <SubmitButton style="w-fit" />
      </div>
    </form>
  );
}
