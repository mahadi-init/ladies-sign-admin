"use client";
import { patchData } from "@/actions/patch";
import BalanceCard from "@/components/native/BalanceCard";
import ButtonGroup from "@/components/native/ButtonGroup";
import ImageUploader from "@/components/native/ImageUploader";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { BACKEND_URL } from "../../site-info";
import { ProfileType } from "../../types/profile.t";

export default function ProfileUI({
  data,
  showBalance = false,
}: {
  data?: Partial<ProfileType>;
  showBalance?: boolean;
}): JSX.Element {
  const [image, setImage] = useState<string>();

  const handleFormInfoUpdate = async (formData: FormData) => {
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const city = formData.get("city");
    const address = formData.get("address");

    const fData = {
      name,
      email,
      phone,
      city,
      address,
      image: image,
      role: data?.role,
    };
    const res = await patchData(
      fData,
      `${BACKEND_URL}/api/admin/update-stuff/${data?._id}`,
      "admins",
      "Profile updated successfully"
    );

    console.log(res);

    if (res.status === 200) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  const handleFormUpdatePassword = async (formData: FormData) => {
    const currentPassword = formData.get("current-password");
    const newPassword = formData.get("new-password");
    const confirmPassword = formData.get("confirm-password");

    console.log(currentPassword, newPassword, confirmPassword);

    if (newPassword !== confirmPassword) {
      toast.error("passwords do not match");
      return;
    }

    const fData = {
      email: data?.email,
      oldPass: currentPassword,
      newPass: newPassword,
    };

    const res = await patchData(
      fData,
      `${BACKEND_URL}/api/admin/change-password`,
      "admins",
      "Password updated successfully"
    );
    if (res.status === 200) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-8 my-8 xl:flex-row justify-center">
        <div className="flex flex-col items-center">
          <ImageUploader image={image ?? data?.image} setImage={setImage} />
        </div>
        {showBalance && <BalanceCard />}
      </div>
      <div className="grid grid-cols-1 gap-8 w-full">
        <Card className="col-span-1 shadow">
          <form action={handleFormInfoUpdate}>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Label htmlFor="name">
                  Name
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    defaultValue={data?.name}
                    placeholder="Jhon Doe"
                    className="mt-2 bg-gray-100"
                  />
                </Label>

                <Label htmlFor="email">
                  Email
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    defaultValue={data?.email}
                    placeholder="xyz@example.com"
                    className="mt-2 bg-gray-100"
                  />
                </Label>

                <Label htmlFor="phone">
                  Phone
                  <Input
                    id="phone"
                    type="tel"
                    name="phone"
                    defaultValue={data?.phone}
                    placeholder="013123456789"
                    className="mt-2 bg-gray-100"
                  />
                </Label>

                <Label htmlFor="address">
                  City
                  <Input
                    id="city"
                    type="text"
                    name="city"
                    defaultValue={data?.city}
                    placeholder="Dhaka"
                    className="mt-2 bg-gray-100"
                  />
                </Label>

                <Label htmlFor="address">
                  Address
                  <Input
                    id="address"
                    type="text"
                    name="address"
                    defaultValue={data?.address}
                    placeholder="Dhanmondi 32"
                    className="mt-2 bg-gray-100"
                  />
                </Label>

                <Label htmlFor="address">
                  Referral Code
                  <Input
                    id="text"
                    type="text"
                    name="referral"
                    defaultValue={data?.phone}
                    placeholder="JHON1234"
                    className="mt-2 bg-gray-100"
                    disabled
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    same as phone number
                  </p>
                </Label>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <ButtonGroup />
            </CardFooter>
          </form>
        </Card>
        <Card className="col-span-1 shadow">
          <form action={handleFormUpdatePassword}>
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="flex flex-col">
                  <Label htmlFor="current-password">
                    Current Password
                    <Input
                      id="current-password"
                      // type="password"
                      name="current-password"
                      placeholder="Current Password"
                      className="mt-2 bg-gray-100"
                      required
                    />
                  </Label>
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="new-password">
                    New Password
                    <Input
                      id="new-password"
                      // type="password"
                      name="new-password"
                      placeholder="New Password"
                      className="mt-2 bg-gray-100"
                      required
                    />
                  </Label>
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    // type="password"
                    name="confirm-password"
                    placeholder="Confirm Password"
                    className="mt-2 bg-gray-100"
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end">
              <ButtonGroup />
            </CardFooter>
          </form>
        </Card>
      </div>
    </>
  );
}
