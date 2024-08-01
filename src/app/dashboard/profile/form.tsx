"use client";
import ButtonGroup from "@/components/native/ButtonGroup";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { AdminType } from "@/types/admin";
import { SellerSchema } from "@/types/seller";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "flowbite-react";
import { useEffect, useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { update } from "./action";

function AdminInfo({ data }: { data?: AdminType }) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminType>({
    resolver: zodResolver(SellerSchema),
  });

  useEffect(() => {
    reset(data);
  }, [reset, data]);

  const onSubmit: SubmitHandler<AdminType> = async (data) => {
    startTransition(async () => {
      const res = await update(data, data._id);

      if (res.success) {
        toast.success("Information updated successfully");
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <Card className="col-span-1 shadow">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4">
            <Label htmlFor="name">
              Name
              <TextInput
                id="name"
                type="text"
                defaultValue={data?.name}
                placeholder="Jhon Doe"
                className="mt-2 bg-gray-100"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-xs text-red-700">
                  {errors.name.message}
                </span>
              )}
            </Label>

            <Label htmlFor="phone">
              Phone
              <TextInput
                id="phone"
                type="tel"
                defaultValue={data?.phone}
                placeholder="0123456789"
                className="mt-2 bg-gray-100"
              />
            </Label>
          </div>
        </CardContent>

        <CardFooter className="justify-end">
          <ButtonGroup isMutating={isPending} />
        </CardFooter>
      </form>
    </Card>
  );
}

function AdminSecurity({ password, id }: { password?: string; id?: string }) {
  const [isPending, startTransition] = useTransition();
  const [passwords, setPasswords] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>();

  const onSubmit = async () => {
    if (!password) {
      toast.error("Please enter your current password");
      return;
    } else if (password !== passwords?.currentPassword) {
      toast.error("Wrong current password");
      return;
    } else if (password?.length < 6) {
      toast.error("Password should be at least 6 characters");
      return;
    } else if (passwords?.newPassword !== passwords?.confirmPassword) {
      toast.error("Password mismatch");
      return;
    }

    startTransition(async () => {
      const res = await update({ password: passwords?.newPassword }, id);

      if (res.success) {
        toast.success("Password updated successfully");
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <Card className="col-span-1 shadow">
      <form action={onSubmit}>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex flex-col">
              <Label htmlFor="current-password">
                Current Password
                <TextInput
                  id="current-password"
                  placeholder="Current Password"
                  className="mt-2 bg-gray-100"
                  required
                  onChange={(e) => {
                    setPasswords((prev) => ({
                      ...prev,
                      currentPassword: e.target.value,
                    }));
                  }}
                />
              </Label>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="new-password">
                New Password
                <TextInput
                  id="new-password"
                  placeholder="New Password"
                  className="mt-2 bg-gray-100"
                  required
                  onChange={(e) => {
                    setPasswords((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }));
                  }}
                />
              </Label>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <TextInput
                id="confirm-password"
                placeholder="Confirm Password"
                className="mt-2 bg-gray-100"
                required
                onChange={(e) => {
                  setPasswords((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="justify-end">
          <ButtonGroup isMutating={isPending} />
        </CardFooter>
      </form>
    </Card>
  );
}

export default function AdminForm({ data }: { data: AdminType }) {
  const [isPending, startTransition] = useTransition();
  // const [image, setImage] = useState<string>();
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   setImage(data?.img);
  // }, [data]);

  // const updateProfileImage = async () => {
  //   if (!image) {
  //     toast.error("Please select an image");
  //     return;
  //   }

  //   if (isLoading) {
  //     toast.error("Please wait for image upload to complete");
  //     return;
  //   }

  //   startTransition(async () => {
  //     const res = await update({ img: image }, data._id);

  //     if (res.success) {
  //       toast.success("Image updated successfully");
  //     } else {
  //       toast.error(res.message);
  //     }
  //   });
  // };

  return (
    <>
      <div className="my-8 flex flex-col justify-center gap-8 xl:flex-row">
        {/* <form
          action={updateProfileImage}
          className="flex flex-col items-center"
        >
          <ImageUploader
            setIsLoading={setIsLoading}
            imgUrl={image}
            setImgUrl={setImage}
            endpoint="admin"
          />
          <SubmitButton
            isMutating={isPending}
            style="w-full mt-2"
            text="Update profile picture"
          />
        </form> */}

        <div className="w-full">
          <AdminInfo data={data} />
        </div>
      </div>

      <div className="grid w-full grid-cols-1 gap-8">
        <AdminSecurity password={data?.password} id={data?._id} />
      </div>
    </>
  );
}
