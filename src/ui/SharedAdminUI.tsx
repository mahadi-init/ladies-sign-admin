"use client";
import { useState } from "react";
import SubmitButton from "@/components/native/SubmitButton";
import DropdownSelect from "@/components/native/DropdownSelect";
import { Response } from "@/types/response";
import { useForm } from "react-hook-form";
import { AdminType } from "@/types/admin";
import ImageUploader from "@/components/native/ImageUploader";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ResetButton from "@/components/native/ResetButton";

const AdminSchema = z.object({
  name: z.string().min(2, "name is too short"),
  email: z.string().email("invalid email address"),
  password: z.string().min(6, "minimum 6 characters required"),
  phone: z.string().min(11, "phone can't be less than 11 characters"),
  joiningDate: z.date(),
});

interface PropTypes extends AdminType {
  adminRoles: string[];
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

export default function SharedAdminUI<T extends PropTypes>(props: T) {
  const [pending, setPending] = useState(false);
  const [role, setAdminRole] = useState(props.role ?? props.adminRoles[0]);
  const [image, setImage] = useState(props.image);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof AdminSchema>>({
    resolver: zodResolver(AdminSchema),
  });

  const handleFormAction = async (formData: z.infer<typeof AdminSchema>) => {
    if (!image) {
      toast.success("select an image");
      return;
    }
    setPending(true);

    //FIXME: Joining has issues
    const data = {
      _id: props._id,
      name: formData.name,
      email: formData.email,
      image: image,
      password: formData.password,
      phone: formData.phone,
      joiningDate: formData.joiningDate,
      role: role,
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
        <ImageUploader image={image} setImage={setImage} />
      </div>

      <div className="flex flex-col gap-6 p-4">
        <div>
          <label className="ml-1 font-medium">
            Name
            <input
              {...register("name")}
              type="text"
              placeholder="Enter name"
              name="name"
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
              type="text"
              name="email"
              placeholder="Enter email"
              defaultValue={props.email}
              required
              className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
            />
          </label>
          {errors.email?.message && (
            <span className="mt-1 text-xs text-red-700">
              {errors.email.message}
            </span>
          )}
        </div>

        <div>
          <label className="ml-1 font-medium">
            Password
            <input
              {...register("password")}
              type="text"
              name="password"
              defaultValue={props.password}
              required
              className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
            />
          </label>
          {errors.password?.message && (
            <span className="mt-1 text-xs text-red-700">
              {errors.password.message}
            </span>
          )}
        </div>

        <div>
          <label className="ml-1 font-medium">
            Phone
            <input
              {...register("phone")}
              type="phone"
              name="phone"
              defaultValue={props.phone}
              required
              className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
            />
          </label>
          {errors.phone?.message && (
            <span className="mt-1 text-xs text-red-700">
              {errors.phone.message}
            </span>
          )}
        </div>

        <div>
          <label className="ml-1 font-medium">
            Joining Date
            <input
              {...register("joiningDate")}
              type="date"
              name="joining"
              defaultValue={
                props.joiningDate &&
                new Date(props.joiningDate).toISOString().substring(0, 10)
              }
              required
              className="block p-2 pl-4 my-2 w-full placeholder-gray-500 text-black bg-gray-100 rounded-md border border-gray-200 transition-all duration-200 focus:bg-white focus:border-blue-600 focus:outline-none caret-blue-600"
            />
          </label>
          {errors.joiningDate?.message && (
            <span className="mt-1 text-xs text-red-700">
              {errors.joiningDate.message}
            </span>
          )}
        </div>

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

        <div className="flex gap-4">
          <ResetButton action={() => reset()} />
          <SubmitButton pending={pending} style="w-fit" />
        </div>
      </div>
    </form>
  );
}
