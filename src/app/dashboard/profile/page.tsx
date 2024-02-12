"use client";
import {
  CardTitle,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import PageTop from "@/components/native/PageTop";
import ImageUploader from "@/components/native/ImageUploader";
import { useContext, useState } from "react";
import { UserAccessContext } from "../access-provider";
import SubmitButton from "@/components/native/SubmitButton";
import { fetcher } from "@/utils/fetcher";
import { BACKEND_URL } from "@/consts/site-info";
import useSWR from "swr";
import { ProfileType } from "@/types/profile";
import FullPageLoading from "@/components/native/FullPageLoading";
import BalanceCard from "./balance-card";

export default function Profile() {
  const { userId } = useContext(UserAccessContext);
  const { data, error, isLoading } = useSWR<ProfileType>(
    `${BACKEND_URL}/api/admin/get/${userId}`,
    fetcher,
  );
  const [image, setImage] = useState<string>();

  if (isLoading) {
    return <FullPageLoading />;
  }

  if (error) {
    return new error();
  }

  return (
    <div className="px-4 mt-12 lg:mt-4 lg:ml-72">
      <PageTop title="Profile" />

      <div>
        <div className="flex flex-col gap-8 my-8 xl:flex-row">
          <div className="flex flex-col items-center">
            <ImageUploader image={image ?? data?.image} setImage={setImage} />
          </div>
          <BalanceCard />
        </div>
        <div className="grid grid-cols-1 gap-8 w-full">
          <Card className="col-span-1 shadow">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
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
                      defaultValue={data?.referralCode}
                      placeholder="JHON1234"
                      className="mt-2 bg-gray-100"
                    />
                  </Label>
                </div>
              </form>
            </CardContent>
            <CardFooter className="justify-end">
              <SubmitButton />
            </CardFooter>
          </Card>
          <Card className="col-span-1 shadow">
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid gap-4">
                  <div className="flex flex-col">
                    <Label htmlFor="current-password">
                      Current Password
                      <Input
                        id="current-password"
                        type="password"
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
                        type="password"
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
                      type="password"
                      name="confirm-password"
                      placeholder="Confirm Password"
                      className="mt-2 bg-gray-100"
                      required
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="justify-end">
              <SubmitButton />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
