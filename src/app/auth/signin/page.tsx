"use client";
import RecoverPassword from "@/components/native/RecoverPassword";
import SubmitButton from "@/components/native/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import addRequest from "@/https/add-request";
import { AdminSchema, AdminType } from "@/types/admin.t";
import { SellerType } from "@/types/seller.t";
import { zodResolver } from "@hookform/resolvers/zod";
import { setCookie } from "cookies-next";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AdminType>({
    resolver: zodResolver(AdminSchema),
  });

  // admin login mutation
  const { trigger: adminLogin, isMutating: isAdminMutating } = useSWRMutation(
    `/admin/login`,
    addRequest
  );

  // seller login mutation
  const { trigger: sellerLogin, isMutating: isSellerMutating } = useSWRMutation(
    `/seller/login`,
    addRequest
  );

  const onSubmit: SubmitHandler<any> = async (data) => {
    if (isAdmin) adminLoginHandler(data);
    else sellerLoginHandler(data);
  };

  const adminLoginHandler = async (data: AdminType) => {
    const res: {
      success: boolean;
      data: AdminType;
      token: string | undefined;
      message: string | undefined;
    } = await adminLogin(data);

    if (res.success === true) {
      setCookie("auth", res.token, {
        sameSite: "none",
        secure: true,
      });

      toast.success(
        `${res.data.name} Successfully Logged in as ${res.data.role}`
      );
      router.replace("/dashboard");
      return;
    }

    toast.error(res.message);
  };

  const sellerLoginHandler = async (data: SellerType) => {
    const res: {
      success: boolean;
      data: SellerType;
      token: string;
      message: string | undefined;
    } = await sellerLogin(data);

    if (res.success === true) {
      setCookie("auth", res.token, {
        sameSite: "none",
        secure: true,
      });

      toast.success(`${res.data.name} Successfully Logged in as Seller`);
      router.replace("/seller");
      return;
    }

    toast.error(res.message);
  };

  return (
    <div className="p-4 flex justify-evenly items-center w-screen h-screen">
      <div className="w-full max-w-md">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Sign in to your account</h1>
          <p className="text-gray-500">
            Create seller account?
            <Link className="underline" href={"/auth/signup" as Route}>
              Sign up
            </Link>
          </p>
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

          <SubmitButton
            isMutating={isAdmin ? isAdminMutating : isSellerMutating}
            style="w-full"
          />
        </form>

        <div className="flex items-center justify-between">
          <Label className="flex items-center gap-2">
            <Input type="checkbox" onChange={() => setIsAdmin(!isAdmin)} />
            <p className="text-nowrap -mt-1">Signin as an admin</p>
          </Label>
          <RecoverPassword />
        </div>
      </div>

      <div className="hidden justify-center items-center py-10 px-4 sm:py-16 sm:px-6 lg:flex lg:py-24 lg:px-8">
        <div>
          <Image
            className="w-96 h-96"
            width={900}
            height={900}
            src="/logo.png"
            alt="logo"
            loading="lazy"
          />

          <div className="mx-auto mt-3 w-full max-w-md xl:max-w-xl">
            <h3 className="text-2xl font-semibold text-center text-black">
              Your best place for shopping
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
