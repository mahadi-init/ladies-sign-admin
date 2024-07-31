"use client";
import ButtonGroup from "@/components/native/ButtonGroup";
import { ImageUploader } from "@/components/native/ImageUploader";
import { SellerSchema, SellerType } from "@/types/seller";
import { zodResolver } from "@hookform/resolvers/zod";
import { FloatingLabel } from "flowbite-react";
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
        <FloatingLabel
          label="Name *"
          variant="outlined"
          type="text"
          color={errors.name && "error"}
          helperText={errors.name && errors.name.message}
          {...register("name", { required: true })}
        />

        <FloatingLabel
          label="Email"
          variant="outlined"
          type="text"
          color={errors.email && "error"}
          helperText={errors.email && errors.email.message}
          {...register("email")}
        />

        <FloatingLabel
          label="Phone *"
          variant="outlined"
          type="text"
          color={errors.phone && "error"}
          helperText={errors.phone && errors.phone.message}
          {...register("phone", { required: true })}
        />

        <FloatingLabel
          label="Whatsapp *"
          variant="outlined"
          type="text"
          color={errors.whatsapp && "error"}
          helperText={errors.whatsapp && errors.whatsapp.message}
          {...register("whatsapp", { required: true })}
        />

        <FloatingLabel
          label="Password *"
          variant="outlined"
          type="text"
          color={errors.password && "error"}
          helperText={errors.password && errors.password.message}
          {...register("password", { required: true })}
        />

        <FloatingLabel
          label="Address *"
          variant="outlined"
          type="text"
          color={errors.address && "error"}
          helperText={errors.address && errors.address.message}
          {...register("address", { required: true })}
        />

        <FloatingLabel
          label="Facebook Profile *"
          variant="outlined"
          type="text"
          color={errors.facebookProfile && "error"}
          helperText={errors.facebookProfile && errors.facebookProfile.message}
          {...register("facebookProfile", { required: true })}
        />

        <FloatingLabel
          label="Facebook Page"
          variant="outlined"
          type="text"
          color={errors.facebookPage && "error"}
          helperText={errors.facebookPage && errors.facebookPage.message}
          {...register("facebookPage")}
        />

        <ButtonGroup isMutating={isPending} />
      </div>
    </form>
  );
}
