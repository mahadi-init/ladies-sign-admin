"use client";
import RecoverPassword from "@/components/native/RecoverPassword";
import SubmitButton from "@/components/native/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import addRequest from "@/https/add-request";
import { site } from "@/site-config";
import { AdminSchema, AdminType } from "@/types/admin.t";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
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

  useEffect(() => {
    const auth = getCookie("auth") as string;

    try {
      const payload = jwt.verify(auth, site.JWT_SECRET);

      //@ts-expect-error
      if (payload && payload.status) {
        //@ts-expect-error
        if (!payload.role) {
          router.replace("/seller/profile");
        } else {
          router.replace("/dashboard");
        }
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }, [router]);

  // loading state
  if (isLoading) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <Image
          src="/authenticating.gif"
          height={300}
          width={300}
          alt="auth"
          unoptimized
        />
        <p className="font-medium">Authenticating...</p>
      </div>
    );
  }

  const onSubmit: SubmitHandler<AdminType> = async (data) => {
    const res = await adminLogin(data);

    if (isSeller) {
      const res = await sellerLogin(data);

      if (res.success === true) {
        toast.success(`${res.data.name} Successfully Logged in as Seller`);
        router.replace("/seller/profile");
        return;
      }
    } else {
      if (res.success === true) {
        toast.success(
          `${res.data.name} Successfully Logged in as ${res.data.role}`
        );
        router.replace("/dashboard");
        return;
      }
    }

    toast.error("Login failed");
  };

  return (
    <div className="p-4 flex justify-evenly items-center w-screen h-screen">
      <div className="w-full max-w-md">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Sign in to your account</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Create seller account?
            <Link className="underline" href={"/signup" as Route}>
              Sign up
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <label htmlFor="email" className="ml-1 font-medium">
            Email <span className="text-red-600">*</span>
            <Input
              id="email"
              type="email"
              placeholder="Enter email"
              className="mt-2.5"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-xs text-red-700">
                {errors.email.message}
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

            <div className="flex items-center justify-between">
              <Label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  onChange={() => setIsSeller(!isSeller)}
                />
                <p className="text-nowrap -mt-1">Signin as a seller</p>
              </Label>
              <RecoverPassword />
            </div>
          </div>

          <SubmitButton
            isMutating={isSeller ? isSellerMutating : isAdminMutating}
            style="w-full"
          />
        </form>
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
