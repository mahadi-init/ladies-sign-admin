"use client";
import ButtonGroup from "@/components/native/ButtonGroup";
import { ImageUploader } from "@/components/native/ImageUploader";
import { AdminSchema, AdminType } from "@/types/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label, TextInput } from "flowbite-react";
import { useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { create, update } from "./action";

interface PropTypes extends AdminType {
  _id?: string;
  message: string;
  actionType: "add" | "edit";
}

export default function AdminForm(props: PropTypes) {
  const [isPending, startTransition] = useTransition();
  const [imgUrl, setImgUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminType>({
    resolver: zodResolver(AdminSchema),
  });

  useEffect(() => {
    reset(props);
  }, [reset, props]);

  const onSubmit: SubmitHandler<AdminType> = async (data) => {
    if (isLoading) {
      toast.error("Please wait for image upload to complete");
      return;
    }

    startTransition(async () => {
      const refinedData: AdminType = {
        ...data,
        img: imgUrl,
      };

      let res;

      if (props.actionType === "add") {
        res = await create(refinedData);
      } else {
        res = await update(props._id as string, refinedData);
      }

      if (res.success) {
        toast.success(props.message);
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <ImageUploader
        setIsLoading={setIsLoading}
        setImgUrl={setImgUrl}
        endpoint="admin"
      />

      <div className="flex flex-col gap-6 p-4">
        <div className="block">
          <div className="mb-1">
            <Label htmlFor="name" value="Name *" />
          </div>
          <TextInput
            type="text"
            color={errors.name && "error"}
            placeholder="Enter name"
            helperText={errors.name && errors.name.message}
            {...register("name", { required: true })}
          />
        </div>

        <div className="block">
          <div className="mb-1">
            <Label htmlFor="email" value="Email *" />
          </div>
          <TextInput
            type="text"
            color={errors.email && "error"}
            placeholder="Enter email"
            helperText={errors.email && errors.email.message}
            {...register("email", { required: true })}
          />
        </div>

        <div className="block">
          <div className="mb-1">
            <Label htmlFor="password" value="Password *" />
          </div>
          <TextInput
            type="text"
            color={errors.password && "error"}
            placeholder="Enter password"
            helperText={errors.password && errors.password.message}
            {...register("password", { required: true })}
          />
        </div>

        <div className="block">
          <div className="mb-1">
            <Label htmlFor="phone" value="Phone *" />
          </div>
          <TextInput
            type="tel"
            id="phone"
            color={errors.phone && "error"}
            placeholder="Enter phone"
            helperText={errors.phone && errors.phone.message}
            {...register("phone", { required: true })}
          />
        </div>

        <ButtonGroup isMutating={isPending} />
      </div>
    </form>
  );
}
