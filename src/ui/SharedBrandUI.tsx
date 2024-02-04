"use client";
import { useState } from "react";
import SubmitButton from "@/components/native/SubmitButton";
import { Response } from "@/types/response";
import { useForm } from "react-hook-form";
import { BrandType } from "@/types/brand";
import { toast } from "sonner";
import ImageUploader from "@/components/native/ImageUploader";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ResetButton from "@/components/native/ResetButton";

const BrandSchema = z.object({
  name: z.string().min(3, { message: "name is too short" }),
  email: z.string().email("invalid email"),
  website: z.string().url("invalid url"),
  location: z.string(),
  isActive: z.boolean().optional(), //TODO: Change that damn thing
});

interface PropTypes extends BrandType {
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

export default function SharedBrandUI<T extends PropTypes>(props: T) {
  const [pending, setPending] = useState(false);
  const [logo, setLogo] = useState(props.logo);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof BrandSchema>>({
    resolver: zodResolver(BrandSchema),
  });

  const handleFormAction = async (formData: z.infer<typeof BrandSchema>) => {
    setPending(true);

    const data = {
      _id: props._id,
      logo: logo,
      name: formData.name,
      email: formData.email,
      website: formData.website,
      location: formData.location,
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

    setPending(false);
  };

  return (
    <form
      className="w-full"
      onSubmit={handleSubmit((data) => handleFormAction(data))}
    >
      <div className="flex flex-col justify-center items-center my-8 w-full">
        <ImageUploader image={logo} setImage={setLogo} />
      </div>

      <div className="flex flex-col gap-6 p-4">
        <div>
          <label className="ml-1 font-medium">
            Name
            <input
              {...register("name")}
              type="text"
              placeholder="sony"
              defaultValue={props.name}
              required
              className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
            />
          </label>
          {errors.name?.message && (
            <span className="mt-1 text-xs text-red-700">
              {errors.name?.message}
            </span>
          )}
        </div>

        <div>
          <label className="ml-1 font-medium">
            Email
            <input
              {...register("email")}
              type="email"
              placeholder="sony@gmail.com"
              defaultValue={props.email}
              required
              className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
            />
          </label>
          {errors.email?.message && (
            <span className="mt-1 text-xs text-red-700">
              {errors.email?.message}
            </span>
          )}
        </div>

        <div>
          <label className="ml-1 font-medium">
            Website
            <input
              {...register("website")}
              type="url"
              placeholder="https://sony.com"
              defaultValue={props.website}
              required
              className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
            />
          </label>
          {errors.website?.message && (
            <span className="mt-1 text-xs text-red-700">
              {errors.website?.message}
            </span>
          )}
        </div>

        <div>
          <label className="ml-1 font-medium">
            Location
            <input
              {...register("location")}
              type="text"
              placeholder="USA"
              defaultValue={props.location}
              required
              className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
            />
          </label>
          {errors.location?.message && (
            <span className="mt-1 text-xs text-red-700">
              {errors.location?.message}
            </span>
          )}
        </div>

        {/* TODO:REMINER -> the main admin panel has active and not active option */}
        {/* <div className="flex items-center">
          <label className="relative mr-4 cursor-pointer">
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

        <div className="flex gap-4 items-center">
          <ResetButton action={() => reset()} />
          <SubmitButton pending={pending} style="w-fit" />
        </div>
      </div>
    </form>
  );
}
