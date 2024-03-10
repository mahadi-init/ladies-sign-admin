"use client";
import { userSignIn } from "@/actions/user-signin";
import RecoverPassword from "@/components/native/RecoverPassword";
import SubmitButton from "@/components/native/SubmitButton";
import { Input } from "@/components/ui/input";
import { hasSiteAccessPermission } from "@/utils/site-access-permission";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

enum AccessStatus {
  LOADING,
  ERROR,
}

export default function Login() {
  const router = useRouter();
  const [hasAccess, setHasAccess] = useState<AccessStatus>(
    AccessStatus.LOADING,
  );

  // Check if user has access permission
  // If yes, redirect to dashboard If no, redirect to login
  useEffect(() => {
    const token = getCookie("access-token");

    if (hasSiteAccessPermission(token)) {
      router.replace("/dashboard");
    }

    setHasAccess(AccessStatus.ERROR);
  }, [router]);

  // Render loading state
  if (hasAccess === AccessStatus.LOADING) {
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <Image src="/authenticating.gif" height={300} width={300} alt="auth" />
        <p className="font-medium">Authenticating...</p>
      </div>
    );
  }

  const handleFormAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await userSignIn(email, password);

    if (res.status === 200) {
      toast.success(res.message);

      if (res.role === "SELLER") {
        router.replace("/seller/profile");
      } else {
        router.replace("/dashboard");
      }
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="flex justify-evenly items-center w-screen h-screen">
      <div className="flex justify-center items-center py-10 px-4 bg-white sm:py-16 sm:px-6 lg:py-24 lg:px-8">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
            Continue Sign in to Ladies Sign
          </h2>

          <form action={handleFormAction} className="mt-6">
            <div className="space-y-5">
              <label htmlFor="email" className="ml-1 font-medium">
                Email <span className="text-red-600">*</span>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className="mt-2.5"
                  required
                />
              </label>

              <div>
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    Password <span className="text-red-600">*</span>
                  </label>
                  <RecoverPassword />
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="123456"
                  className="mt-2.5"
                  required
                />
              </div>
              <SubmitButton style="w-full" />
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
