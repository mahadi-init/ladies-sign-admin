"use client";
import ButtonGroup from "@/components/native/ButtonGroup";
import ImageUploader from "@/components/native/ImageUploader";
import { Input } from "@/components/ui/input";
import useStatus from "@/hooks/useStatus";
import { AdminSchema, AdminType } from "@/types/admin.t";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface PropTypes extends AdminType {
  trigger: (arg: unknown) => Promise<{ success: boolean; message?: string }>;
  isMutating: boolean;
  successMessage: string;
}

export default function AdminUI(props: PropTypes) {
  const roles = ["EDITOR", "ADMIN", "SUPERADMIN"];
  const [image, setImage] = useState<string>();
  const { showStatus } = useStatus();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminType>({
    resolver: zodResolver(AdminSchema),
  });

  const onSubmit: SubmitHandler<AdminType> = async (data) => {
    const refinedData: AdminType = {
      ...data,
      img: image,
      status: data.status ? false : true,
    };

    const res = await props.trigger(refinedData);
    showStatus("/admin", props.successMessage, res);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full xl:w-7/12">
      <ImageUploader image={image} setImage={setImage} folder="admin" />

      <div className="flex flex-col gap-6 p-4">
        <label className="ml-1 font-medium">
          Name <span className="text-red-600">*</span>
          <Input
            type="text"
            placeholder="Jhon Doe"
            defaultValue={props.name}
            className="mt-1 bg-gray-100"
            required
            {...register("name")}
          />
          {errors.name && (
            <span className="text-xs text-red-700">{errors.name.message}</span>
          )}
        </label>

        <label className="ml-1 font-medium">
          Email <span className="text-red-600">*</span>
          <Input
            type="email"
            placeholder="Enter email"
            defaultValue={props.email}
            className="mt-1 bg-gray-100"
            required
            {...register("email")}
          />
          {errors.email && (
            <span className="text-xs text-red-700">{errors.email.message}</span>
          )}
        </label>

        <label className="ml-1 font-medium">
          Password <span className="text-red-600">*</span>
          <Input
            type="text"
            defaultValue={props.password}
            placeholder="Enter password"
            className="mt-1 bg-gray-100"
            required
            {...register("password")}
          />
          {errors.password && (
            <span className="text-xs text-red-700">
              {errors.password.message}
            </span>
          )}
        </label>

        <label className="ml-1 font-medium">
          Phone <span className="text-red-600">*</span>
          <Input
            type="tel"
            defaultValue={props.phone}
            className="mt-1 bg-gray-100"
            placeholder="Enter phone number"
            required
            {...register("phone")}
          />
          {errors.phone && (
            <span className="text-xs text-red-700">{errors.phone.message}</span>
          )}
        </label>

        <label className="ml-1 font-medium">
          Address
          <Input
            type="text"
            defaultValue={props.address}
            className="mt-1 bg-gray-100"
            placeholder="Enter address"
            {...register("address")}
          />
          {errors.address && (
            <span className="text-xs text-red-700">
              {errors.address.message}
            </span>
          )}
        </label>

        <div>
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="role"
          >
            Role <span className="text-red-500">*</span>
          </label>
          <select
            id="role"
            defaultValue={props.role}
            className="mt-0.5 w-full p-3 bg-gray-100 rounded-md"
            {...register("role")}
          >
            {roles.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>

        <ButtonGroup isMutating={props.isMutating} />
      </div>
    </form>
  );
}
