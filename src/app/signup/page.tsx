"use client";
import SubmitButton from "@/components/native/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import addRequest from "@/https/add-request";
import { SellerSchema, SellerType } from "@/types/seller.t";
import { zodResolver } from "@hookform/resolvers/zod";
import { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWRMutation from "swr/mutation";

export default function Signup() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SellerType>({
    resolver: zodResolver(SellerSchema),
  });
  const { trigger, isMutating } = useSWRMutation(
    `/seller/register`,
    addRequest,
  );

  const onSubmit: SubmitHandler<SellerType> = async (data) => {
    const res = await trigger(data);

    if (res.success) {
      toast.success("Signup successfull");
      router.push("/");
    } else {
      toast.error(res?.message);
    }
  };

  return (
    <div className="p-4 flex justify-evenly items-center w-screen h-screen">
      <div className="w-full max-w-md">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Create an account</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Already have an account?
            <Link className="underline" href="/">
              Sign in
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">
              Name <span className="text-red-600">*</span>
            </Label>
            <Input
              type="text"
              id="name"
              placeholder="নাম লিখুন"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-xs text-red-700">
                {errors.name.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone <span className="text-red-600">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="ফোন নাম্বার লিখুন"
              {...register("phone", { required: true })}
            />
            {errors.phone && (
              <span className="text-xs text-red-700">
                {errors.phone.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="whatsapp">
              Whatsapp <span className="text-red-600">*</span>
            </Label>
            <Input
              id="whatsapp"
              type="tel"
              placeholder="হোয়াটস্যাপ নাম্বার দিন"
              {...register("whatspp", { required: true })}
            />
            {errors.whatspp && (
              <span className="text-xs text-red-700">
                {errors.whatspp.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">
              Password <span className="text-red-600">*</span>
            </Label>
            <Input
              type="password"
              id="password"
              placeholder="পাসওয়ার্ড দিন"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-xs text-red-700">
                {errors.password.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">
              Address <span className="text-red-600">*</span>
            </Label>
            <Input
              id="address"
              type="text"
              placeholder="ঠিকানা দিন (জেলা, থানা, গ্রাম)"
              {...register("address", { required: true })}
            />
            {errors.address && (
              <span className="text-xs text-red-700">
                {errors.address.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="facebookProfile">
              Facebook Profile Link <span className="text-red-600">*</span>
            </Label>
            <Input
              type="text"
              id="facebookProfile"
              placeholder="ফেইসবুক প্রোফাইল লিংক"
              {...register("facebookAccount", { required: true })}
            />
            {errors.facebookAccount && (
              <span className="text-xs text-red-700">
                {errors.facebookAccount.message}
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="facebookPage">Facebook Page Link</Label>
            <Input
              type="text"
              id="facebookPage"
              placeholder="ফেইসবুক পেজ লিংক"
              {...register("facebookPage")}
            />
            {errors.facebookPage && (
              <span className="text-xs text-red-700">
                {errors.facebookPage.message}
              </span>
            )}
          </div>

          <SubmitButton isMutating={isMutating} />
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