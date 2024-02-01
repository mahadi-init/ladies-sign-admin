"use client";
import { useState } from "react";
import { Upload } from "lucide-react";
import SubmitButton from "@/components/native/SubmitButton";
import { useStatusContext } from "@/contexts/status-context";
import DropdownSelect from "@/components/native/DropdownSelect";
import { CldUploadButton, CldUploadWidgetResults } from "next-cloudinary";
import { CLOUDINARY_UPLOAD_PRESET } from "@/consts/site-info";
import { Response } from "@/types/response";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { AdminType } from "../type";

//TODO: Add status option
type Inputs = {
  name: string;
  email: string;
  password: string;
  phone: string;
  joiningDate: string;
};

interface PropTypes extends AdminType {
  adminRoles: string[];
  serverAction: <T extends { _id?: string }>(data: T) => Promise<Response>;
}

export default function SharedAdminUI<T extends PropTypes>(props: T) {
  const { setSuccessStatus, setErrorStatus } = useStatusContext();
  const { register } = useForm<Inputs>();
  const [image, setImage] = useState(props.image);
  const [role, setAdminRole] = useState(props.role ?? props.adminRoles[0]);

  const handleFormAction = async (formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const phone = formData.get("phone");
    const joiningDate = formData.get("joining");

    if (!image) {
      setErrorStatus("select an image");
      return;
    }

    //FIXME: Joining has issues
    const value = {
      _id: props._id,
      name: name,
      email: email,
      image: image,
      password: password,
      phone: phone,
      joiningDate: joiningDate,
      role: role,
    };

    const res = await props.serverAction(value);
    if (res.status === 200) {
      setSuccessStatus(res.message);
    } else {
      setErrorStatus(res.message);
    }
  };

  return (
    <form action={handleFormAction} className="w-full">
      <div className="flex flex-col items-center justify-center my-8 w-full">
        <picture>
          <Image
            src={image ?? "/logo.png"}
            className="w-64 rounded-md"
            height={400}
            width={400}
            alt="upload"
            loading="lazy"
          />
        </picture>

        <CldUploadButton
          uploadPreset={CLOUDINARY_UPLOAD_PRESET}
          options={{
            multiple: false,
            maxFiles: 1,
          }}
          onSuccess={(result: CldUploadWidgetResults) => {
            if (result.info) {
              //@ts-expect-error
              setImage(result.info.url);
            }
          }}
          onError={() => {
            setErrorStatus("Error uploading");
          }}
        >
          <label
            htmlFor="uploadFile1"
            className="flex flex-col justify-center items-center mx-auto mt-4 w-80 h-24 text-base text-black bg-white rounded border-2 border-gray-300 border-dashed cursor-pointer font-[sans-serif]"
          >
            <Upload />
            Upload
            <p className="mt-2 text-xs text-gray-400">
              PNG, JPG SVG, WEBP, and GIF are Allowed.
            </p>
          </label>
        </CldUploadButton>
      </div>

      <div className="p-4 flex flex-col gap-6">
        <label className="ml-1 font-medium">
          Name
          <input
            {...(register("name"), { required: true })}
            type="text"
            placeholder="Enter name"
            name="name"
            defaultValue={props.name}
            className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
          />
        </label>

        <label className="ml-1 font-medium">
          Email
          <input
            {...(register("email"), { required: true })}
            type="text"
            name="email"
            placeholder="Enter email"
            defaultValue={props.email}
            className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
          />
        </label>

        <label className="ml-1 font-medium">
          Password
          <input
            {...(register("password"), { required: true })}
            type="text"
            name="password"
            defaultValue={props.password}
            className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
          />
        </label>

        <label className="ml-1 font-medium">
          Phone
          <input
            {...(register("phone"), { required: true })}
            type="phone"
            name="phone"
            defaultValue={props.phone}
            className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
          />
        </label>

        <label className="ml-1 font-medium">
          Joining Date
          <input
            {...(register("joiningDate"), { required: true })}
            type="date"
            name="joining"
            defaultValue={
              props.joiningDate &&
              new Date(props.joiningDate).toISOString().substring(0, 10)
            }
            className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
          />
        </label>

        <label className="ml-1 font-medium">
          Admin Role
          <DropdownSelect
            name="productType"
            placeholder="Select Product Type"
            style="w-full mt-1 bg-gray-100"
            items={props.adminRoles}
            selectedItem={role}
            setSelectedItem={setAdminRole}
          />
        </label>

        <SubmitButton style="w-fit" />
      </div>
    </form>
  );
}
