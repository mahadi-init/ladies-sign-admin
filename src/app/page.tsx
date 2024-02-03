"use client";
import Image from "next/image";
import Modal from "../components/native/Modal";
import SubmitButton from "@/components/native/SubmitButton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { userSignin } from "./_action";
import { toast } from "sonner";

export default function Login() {
  const handleFormAction = async (formData: FormData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    const data = {
      email: email,
      password: password,
    };

    const user = await userSignin(data);

    if (user.status === 200) {
      toast.success(user.message);
    } else {
      toast.error(user.message);
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
              <div>
                <label
                  htmlFor="email"
                  className="text-base font-medium text-gray-900"
                >
                  Email
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="xyz@gmail.com"
                    className="mt-2.5"
                  />
                </label>
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="password"
                    className="text-base font-medium text-gray-900"
                  >
                    Password
                  </label>

                  <Modal
                    title="Recover Password"
                    description="By entering the email address you recover the account "
                    openModalTrigger={
                      <Button
                        type="button"
                        variant="link"
                        className="text-blue-600"
                      >
                        Forget password?
                      </Button>
                    }
                  >
                    <div className="space-y-5">
                      <div>
                        <label
                          htmlFor="email"
                          className="text-base font-medium text-gray-900"
                        >
                          Email
                          <Input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="xyz@gmail.com"
                            className="mt-2.5"
                          />
                        </label>
                      </div>
                    </div>
                  </Modal>
                </div>
                <div className="mt-2.5">
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="12345"
                  />
                </div>
              </div>

              <div>
                <SubmitButton style="w-full" />
              </div>
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
