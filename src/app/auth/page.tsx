"use client";
import RecoverPassword from "@/components/native/RecoverPassword";
import SubmitButton from "@/components/native/SubmitButton";
import { AdminSchema, AdminType } from "@/types/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label, TextInput } from "flowbite-react";
import { Lock, Phone } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { login } from "./action";

export default function Signin() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminType>({
    resolver: zodResolver(AdminSchema),
  });

  const onSubmit: SubmitHandler<AdminType> = async (data) => {
    startTransition(async () => {
      const res = await login(data.phone, data.password);

      if (res && !res.success) {
        toast.error("Login failed");
      }
    });
  };

  return (
    <div className="flex h-screen w-screen items-center justify-evenly p-4">
      <div className="w-full max-w-md">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Sign in to your account</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <div className="block">
            <div className="mb-1">
              <Label htmlFor="phone" value="Phone *" />
            </div>
            <TextInput
              id="phone"
              type="phone"
              defaultValue={"01315631667"}
              color={errors.phone && "error"}
              placeholder="Enter your phone number"
              helperText={errors.phone && errors.phone.message}
              icon={Phone}
              {...register("phone", { required: true })}
            />
          </div>

          <div className="block">
            <div className="mb-1">
              <Label htmlFor="password" value="Password *" />
            </div>
            <TextInput
              id="password"
              type="password"
              defaultValue={"624234"}
              color={errors.password && "error"}
              placeholder="Enter your password"
              icon={Lock}
              helperText={errors.password && errors.password.message}
              {...register("password", { required: true })}
            />
          </div>

          <SubmitButton isMutating={isPending} style="w-full" />
        </form>

        <div className="flex justify-end">
          <RecoverPassword />
        </div>
      </div>

      <div className="hidden items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:flex lg:px-8 lg:py-24">
        <div>
          <Image
            className="h-96 w-96"
            width={900}
            height={900}
            src="/logo.png"
            alt="logo"
            loading="lazy"
          />

          <div className="mx-auto mt-3 w-full max-w-md xl:max-w-xl">
            <h3 className="text-center text-2xl font-semibold text-black">
              Your best place for shopping
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
