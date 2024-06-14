"use client";
import RecoverPassword from "@/components/native/RecoverPassword";
import SubmitButton from "@/components/native/SubmitButton";
import { Input } from "@/components/ui/input";
import addRequest from "@/https/add-request";
import { AdminSchema, AdminType } from "@/types/admin.t";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminType>({
    resolver: zodResolver(AdminSchema),
  });

  const { trigger, isMutating } = useSWRMutation(
    `/auth/login?role=admin`,
    addRequest,
  );

  const onSubmit: SubmitHandler<any> = async (data) => {
    const res: {
      success: boolean;
      data: AdminType;
      token: string | undefined;
      message: string | undefined;
    } = await trigger(data);

    if (res.success === true) {
      setCookie("auth", res.token, {
        sameSite: "none",
        secure: true,
      });

      toast.success(`${res.data.name} Successfully Logged in`);
      router.replace("/dashboard");
      return;
    }

    toast.error(res.message);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-evenly p-4">
      <div className="w-full max-w-md">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Sign in to your account</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <label htmlFor="phone" className="ml-1 font-medium">
            Phone Number <span className="text-red-600">*</span>
            <Input
              id="tel"
              type="phone"
              placeholder="Enter Phone"
              className="mt-2.5"
              {...register("phone", { required: true })}
            />
            {errors.phone && (
              <span className="text-xs text-red-700">
                {errors.phone.message}
              </span>
            )}
          </label>

          <div className="space-y-5">
            <label
              htmlFor="password"
              className="text-base font-medium text-gray-900"
            >
              Password <span className="text-red-600">*</span>
              <Input
                id="password"
                type="password"
                placeholder="Enter strong password"
                className="mt-2.5"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-xs text-red-700">
                  {errors.password.message}
                </span>
              )}
            </label>
          </div>

          <SubmitButton isMutating={isMutating} style="w-full" />
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
