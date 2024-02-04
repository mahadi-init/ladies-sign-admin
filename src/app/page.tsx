"use client";
import Image from "next/image";
import SubmitButton from "@/components/native/SubmitButton";
import { Input } from "@/components/ui/input";
import { userSignin } from "./_action";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import RecoverPassword from "./recover-password";
import { useState } from "react";

const UserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "mininum 6 character required"),
});

export default function Login() {
  const [pending, setPending] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
  });

  const handleFormAction = async (data: z.infer<typeof UserSchema>) => {
    setPending(true);

    const res = await userSignin({
      email: data.email,
      password: data.password,
    });

    if (res.status === 200) {
      toast.success("Logged in successful");
    } else {
      toast.error("Login failed");
    }

    setPending(false);
  };

  return (
    <div className="flex justify-evenly items-center w-screen h-screen">
      <div className="flex justify-center items-center py-10 px-4 bg-white sm:py-16 sm:px-6 lg:py-24 lg:px-8">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
            Continue Sign in to Ladies Sign
          </h2>

          <form
            onSubmit={handleSubmit((data) => handleFormAction(data))}
            className="mt-6"
          >
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="ml-1 font-medium">
                  Email
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    className="mt-2.5"
                    required
                  />
                </label>
                {errors.email?.message && (
                  <span className="mt-1 text-xs text-red-700">
                    {errors.email?.message}
                  </span>
                )}
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    Password
                  </label>

                  <RecoverPassword />
                </div>

                <div className="mt-2.5">
                  <Input
                    {...register("password")}
                    id="password"
                    type="password"
                    placeholder="123456"
                    required
                  />
                  {errors.password?.message && (
                    <span className="mt-1 text-xs text-red-700">
                      {errors.password?.message}
                    </span>
                  )}
                </div>
              </div>
              <SubmitButton pending={pending} style="w-full" />
            </div>

            <div className="mt-4">
              <label htmlFor="remember-me" className="flex gap-2">
                <input
                  id="remember-me"
                  type="checkbox"
                  name="remember-me"
                  className="w-4"
                />
                <p className="font-semibold">Remember me</p>
              </label>
            </div>
          </form>
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
