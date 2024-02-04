"use client";
import { useState } from "react";
import SubmitButton from "@/components/native/SubmitButton";
import DropdownSelect from "@/components/native/DropdownSelect";
import { Response } from "@/types/response";
import { CategoryType } from "@/types/category";
import { toast } from "sonner";
import ImageUploader from "@/components/native/ImageUploader";
import { Input } from "@/components/ui/input";

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
  const [img, setImg] = useState(props.img);
  const [productType, setProductType] = useState(
    props.productType ?? props.productTypes[0],
  );

  const handleFormAction = async (formData: FormData) => {
    //FIXME: FIX THE visibility issue
    // if (!img && formData.visibility) {
    //   toast.error("hide or select an image");
    //   return;
    // }
    //
    //
    const parent = formData.get("parent");
    const children = formData.get("children") as string;

    const data = {
      _id: props._id,
      img: img,
      parent: parent,
      children: children.split(","),
      // status: formData.visibility,
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
          <Input
            type="text"
            name="parent"
            placeholder="Enter parent name"
            defaultValue={props.parent}
            className="mt-1 bg-gray-100"
            required
          />
        </label>

        <label className="ml-1 font-medium">
          Children
          <textarea
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
            selectedItem={productType}
            setSelectedItem={setProductType}
          />
        </label>

        <SubmitButton style="w-fit" />
      </div>
    </form>
  );
}
