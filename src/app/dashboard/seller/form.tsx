"use client";
import ButtonGroup from "@/components/native/ButtonGroup";
import { ImageUploader } from "@/components/native/ImageUploader";
import { SellerSchema, SellerType } from "@/types/seller";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label, TextInput } from "flowbite-react";
import { useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { create, update } from "./action";

interface PropTypes extends SellerType {
  _id?: string;
  message: string;
  actionType: "add" | "edit";
}

export default function SellerForm(props: PropTypes) {
  const [isPending, startTransition] = useTransition();
  const [imgUrl, setImgUrl] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SellerType>({
    resolver: zodResolver(SellerSchema),
  });

  useEffect(() => {
    reset(props);
  }, [reset, props]);

  const onSubmit: SubmitHandler<SellerType> = async (data) => {
    if (isLoading) {
      toast.error("Please wait for image upload to complete");
      return;
    }

    startTransition(async () => {
      const refinedData: SellerType = {
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
        endpoint="seller"
      />

      <div className="flex flex-col gap-6 p-4">
        <div className="block">
          <div className="mb-1">
            <Label htmlFor="name" value="Name *" />
          </div>
          <TextInput
            type="text"
            id="name"
            color={errors.name && "error"}
            placeholder="Enter phone"
            helperText={errors.name && errors.name.message}
            {...register("name", { required: true })}
          />
        </div>

        <div className="block">
          <div className="mb-1">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            id="email"
            type="text"
            color={errors.email && "error"}
            placeholder="Enter email"
            helperText={errors.email && errors.email.message}
            {...register("email")}
          />
        </div>

        <div className="block">
          <div className="mb-1">
            <Label htmlFor="phone" value="Phone *" />
          </div>
          <TextInput
            type="text"
            id="phone"
            color={errors.phone && "error"}
            placeholder="Enter phone"
            helperText={errors.phone && errors.phone.message}
            {...register("phone", { required: true })}
          />
        </div>

        <div className="block">
          <div className="mb-1">
            <Label htmlFor="whatsapp" value="Whatsapp *" />
          </div>
          <TextInput
            type="text"
            id="whatsapp"
            color={errors.whatsapp && "error"}
            placeholder="Enter whatsapp"
            helperText={errors.whatsapp && errors.whatsapp.message}
            {...register("whatsapp", { required: true })}
          />
        </div>

        <div className="block">
          <div className="mb-1">
            <Label htmlFor="password" value="Password *" />
          </div>
          <TextInput
            type="text"
            id="password"
            color={errors.password && "error"}
            placeholder="Enter password"
            helperText={errors.password && errors.password.message}
            {...register("password", { required: true })}
          />
        </div>

        <div className="block">
          <div className="block">
            <div className="mb-1">
              <Label htmlFor="address" value="Address *" />
            </div>
            <TextInput
              type="text"
              id="address"
              color={errors.address && "error"}
              placeholder="Enter address"
              helperText={errors.address && errors.address.message}
              {...register("address", { required: true })}
            />
          </div>
        </div>

        <div className="block">
          <div className="mb-1">
            <Label htmlFor="profile" value="Profile *" />
          </div>
          <TextInput
            type="text"
            id="profile"
            color={errors.facebookProfile && "error"}
            placeholder="Enter facebook profile"
            helperText={
              errors.facebookProfile && errors.facebookProfile.message
            }
            {...register("facebookProfile", { required: true })}
          />
        </div>

        <div className="block">
          <div className="mb-1">
            <Label htmlFor="page" value="Page" />
          </div>
          <TextInput
            type="text"
            id="page"
            color={errors.facebookPage && "error"}
            placeholder="Enter facebook page"
            helperText={errors.facebookPage && errors.facebookPage.message}
            {...register("facebookPage")}
          />
        </div>

        <ButtonGroup isMutating={isPending} />
      </div>
    </form>
  );
}
