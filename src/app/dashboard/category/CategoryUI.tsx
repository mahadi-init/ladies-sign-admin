"use client";
import { cloudinaryUpload } from "@/actions/cloudinary-upload";
import ButtonGroup from "@/components/native/ButtonGroup";
import FormImageUploader from "@/components/native/FormImageUploader";
import { Input } from "@/components/ui/input";
import { CategoryType } from "@/types/category.t";
import { LocalResponse } from "@/types/response.t";
import showToast from "@/utils/ShowToast";
import { toast } from "sonner";

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

export default function CategoryUI(props: PropTypes) {
  const handleFormAction = async (formData: FormData) => {
    const parent = formData.get("parent");
    const children = formData.get("children") as string;
    const productType = formData.get("product-type");
    const hide = formData.get("hide");
    const img = formData.get("img") as File;

    const cloud = await cloudinaryUpload(formData, "img", "admin");

    if (img.size <= 0 && !hide) {
      toast.error("hide or select an image");
      return;
    }

    const data = {
      _id: props._id,
      img: cloud?.url ?? undefined,
      parent: parent,
      children: children.split(","),
      productType: productType,
      status: hide === "on" ? "HIDE" : "SHOW",
    };

    const res = await props.serverAction(
      data,
      props.queryUrl,
      props.validationTag,
      props.successMessage
    );

    showToast(res);
  };

  return (
    <form action={handleFormAction} className="w-full xl:w-7/12">
      <div className="flex flex-col justify-center items-center my-8 w-full">
        <FormImageUploader name="img" image={props.img} />
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

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="product-type"
          >
            Product Type <span className="text-red-500">*</span>
          </label>
          <select
            name="product-type"
            id="product-type"
            defaultValue={props.productType ?? props.productTypes[0]}
            className="mt-0.5 w-full p-2 bg-gray-100 rounded-md"
          >
            {props.productTypes?.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
          <p className="mt-2 text-sm text-gray-500">Set the product type</p>
        </div>

        <label className="ml-1 font-medium flex items-center gap-2">
          <Input
            type="checkbox"
            name="hide"
            className="bg-gray-100 w-fit"
            defaultChecked={props.status === "HIDE"}
          />
          Hide <span className="text-xs text-red-600">(default show)</span>
        </label>

        <ButtonGroup />
      </div>
    </form>
  );
}
