"use client";
import { useState } from "react";
import { Upload } from "lucide-react";
import SubmitButton from "@/components/native/SubmitButton";
import { useStatusContext } from "@/contexts/status-context";
import { CldUploadButton } from "next-cloudinary";
import { CLOUDINARY_UPLOAD_PRESET } from "@/consts/site-info";
import { Response } from "@/types/response";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { BrandType } from "../type";

type Inputs = {
  name: string;
  email: string;
  website: string;
  location: string;
  isActive: boolean;
};

interface PropTypes extends BrandType {
  serverAction: <T extends { _id?: string }>(data: T) => Promise<Response>;
}

export default function SharedBrandUI<T extends PropTypes>(props: T) {
  const { setSuccessStatus, setErrorStatus } = useStatusContext();
  const { register } = useForm<Inputs>();
  const [logo, setLogo] = useState(props.logo);

  const handleFormAction = async (formData: FormData) => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const website = formData.get("website");
    const location = formData.get("location");

    if (!logo) {
      setErrorStatus("select an image");
      return;
    }

    const value = {
      _id: props._id,
      logo: logo,
      name: name,
      email: email,
      website: website,
      location: location,
    };

    const res = await props.serverAction(value);
    if (res.status === 200) {
      setSuccessStatus(res.message);
    } else {
      setErrorStatus(res.message);
    }
  };

  return (
    <form action={handleFormAction} className="w-full lg:w-8/12">
      <div className="flex flex-col items-center justify-center my-8 w-full">
        <picture>
          <Image
            src={logo ?? "/logo.png"}
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
          onSuccess={(result) => {
            if (result.info) {
              //@ts-ignore
              setLogo(result.info.url);
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
            name="email"
            type="email"
            placeholder="Enter email"
            defaultValue={props.email}
            className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
          />
        </label>

        <label className="ml-1 font-medium">
          Website
          <input
            {...(register("website"), { required: true })}
            name="website"
            type="url"
            placeholder="Enter website"
            defaultValue={props.website}
            className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
          />
        </label>

        <label className="ml-1 font-medium">
          Location
          <input
            {...(register("location"), { required: true })}
            name="location"
            placeholder="Enter location"
            defaultValue={props.location}
            className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
          />
        </label>

        {/* TODO:REMINER -> the main admin panel has active and not active option */}
        {/* <div className="flex items-center">
          <label className="relative cursor-pointer mr-4">
            <input
              {...register("status")}
              name="status"
              type="checkbox"
              defaultValue={props.status}
              className="sr-only peer"
            />
            <div className="w-11 h-6 flex items-center bg-gray-300 rounded-full peer peer-checked:after:translate-x-full after:absolute after:left-[2px] peer-checked:after:border-white after:bg-white after:border after:border-gray-300 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#007bff]"></div>
          </label>
          <p className="text-sm font-medium text-gray-900 dark:text-gray-300">
            Show category in preview
          </p>
        </div> */}

        <SubmitButton style="w-fit" />
      </div>
    </form>
  );
}
