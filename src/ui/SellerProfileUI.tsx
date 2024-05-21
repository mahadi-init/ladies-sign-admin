"use client";
import ButtonGroup from "@/components/native/ButtonGroup";
import { ImageUploader } from "@/components/native/ImageUploader";
import LoadingSkeleton from "@/components/native/LoadingSkeleton";
import SubmitButton from "@/components/native/SubmitButton";
import BalanceCard from "@/components/seller/BalanceCard";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useStatus from "@/hooks/useStatus";
import { fetcher } from "@/https/get-request";
import updateRequest from "@/https/update-request";
import { SellerSchema, SellerType } from "@/types/seller.t";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

function SellerInfo({ data }: { data?: SellerType }) {
  const { trigger, isMutating } = useSWRMutation(
    `/seller/edit/${data?._id}`,
    updateRequest,
  );
  const { showStatus } = useStatus();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SellerType>({
    resolver: zodResolver(SellerSchema),
  });

  useEffect(() => {
    reset(data);
  }, [reset, data]);

  const onSubmit: SubmitHandler<SellerType> = async (data) => {
    const res = await trigger(data);
    showStatus("/seller", "Information updated successfully", res);
  };

  return (
    <Card className="col-span-1 shadow">
      <form onSubmit={handleSubmit(onSubmit)}>
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
                defaultValue={data?.name}
                placeholder="নাম লিখুন"
                className="mt-2 bg-gray-100"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-xs text-red-700">
                  {errors.name.message}
                </span>
              )}
            </Label>

            <Label htmlFor="address">
              Address
              <Input
                id="address"
                type="text"
                defaultValue={data?.address}
                placeholder="ঠিকানা লিখুন"
                className="mt-2 bg-gray-100"
                {...register("address", { required: true })}
              />
              {errors.address && (
                <span className="text-xs text-red-700">
                  {errors.address.message}
                </span>
              )}
            </Label>

            <Label htmlFor="license">
              License
              <Input
                id="license"
                type="text"
                defaultValue={data?.license}
                placeholder="লাইসেন্স নাম্বার লিখুন"
                className="mt-2 bg-gray-100"
                {...register("license")}
              />
              {errors.license && (
                <span className="text-xs text-red-700">
                  {errors.license.message}
                </span>
              )}
            </Label>

            <Label htmlFor="nid">
              NID
              <Input
                id="nid"
                type="text"
                defaultValue={data?.nid}
                placeholder="ন্যাশনাল আইডি লিখুন"
                className="mt-2 bg-gray-100"
              />
              {errors.nid && (
                <span className="text-xs text-red-700">
                  {errors.nid.message}
                </span>
              )}
            </Label>

            <Label htmlFor="whatsapp">
              Whatsapp
              <Input
                id="whatsapp"
                type="tel"
                defaultValue={data?.whatsapp}
                placeholder="হোয়াটস্যাপ লিখুন"
                className="mt-2 bg-gray-100"
              />
              {errors.whatsapp && (
                <span className="text-xs text-red-700">
                  {errors.whatsapp.message}
                </span>
              )}
            </Label>

            <Label htmlFor="fb-profile">
              Facebook Profile
              <Input
                id="fb-profile"
                type="text"
                defaultValue={data?.facebookProfile}
                placeholder="ফেইসবুক প্রোফাইল লিখুন"
                className="mt-2 bg-gray-100"
                {...register("facebookProfile")}
              />
              {errors.facebookProfile && (
                <span className="text-xs text-red-700">
                  {errors.facebookProfile.message}
                </span>
              )}
            </Label>

            <Label htmlFor="fb-page">
              Facebook Page
              <Input
                id="fb-page"
                type="text"
                defaultValue={data?.facebookPage}
                placeholder="ফেইসবুক পেজ লিখুন"
                className="mt-2 bg-gray-100"
                {...register("facebookPage")}
              />
              {errors.facebookPage && (
                <span className="text-xs text-red-700">
                  {errors.facebookPage.message}
                </span>
              )}
            </Label>

            <Label htmlFor="phone">
              Phone
              <Input
                id="phone"
                type="tel"
                defaultValue={data?.phone}
                placeholder="ফোন নাম্বার লিখুন"
                className="mt-2 bg-gray-100"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">
                contact with admin to change
              </p>
            </Label>

            <Label htmlFor="address">
              Referral Code
              <Input
                id="text"
                type="text"
                defaultValue={data?.phone}
                placeholder="রেফারেল লিখুন"
                className="mt-2 bg-gray-100"
                disabled
              />
              <p className="text-xs text-gray-500 mt-1">same as phone number</p>
            </Label>
          </div>
        </CardContent>

        <CardFooter className="justify-end">
          <ButtonGroup isMutating={isMutating} />
        </CardFooter>
      </form>
    </Card>
  );
}

function SellerSecurity({ password, id }: { password?: string; id?: string }) {
  const { trigger, isMutating } = useSWRMutation(
    `/seller/change-password/${id}`,
    updateRequest,
  );
  const { showStatus } = useStatus();
  const [passwords, setPasswords] = useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>();

  const onSubmit = async () => {
    if (!password) {
      toast.error("Please enter your current password");
      return;
    } else if (password !== passwords?.currentPassword) {
      toast.error("Wrong current password");
      return;
    } else if (password?.length <= 6) {
      toast.error("Password should be at least 6 characters");
      return;
    } else if (passwords?.newPassword !== passwords?.confirmPassword) {
      toast.error("Password mismatch");
      return;
    }

    const res = await trigger({ password: passwords?.newPassword });
    showStatus("/seller", "Password successfully updated", res);
  };

  return (
    <Card className="col-span-1 shadow">
      <form action={onSubmit}>
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
                  placeholder="Current Password"
                  className="mt-2 bg-gray-100"
                  required
                  onChange={(e) => {
                    setPasswords((prev) => ({
                      ...prev,
                      currentPassword: e.target.value,
                    }));
                  }}
                />
              </Label>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="new-password">
                New Password
                <Input
                  id="new-password"
                  placeholder="New Password"
                  className="mt-2 bg-gray-100"
                  required
                  onChange={(e) => {
                    setPasswords((prev) => ({
                      ...prev,
                      newPassword: e.target.value,
                    }));
                  }}
                />
              </Label>
            </div>
            <div className="flex flex-col">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                placeholder="Confirm Password"
                className="mt-2 bg-gray-100"
                required
                onChange={(e) => {
                  setPasswords((prev) => ({
                    ...prev,
                    confirmPassword: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
        </CardContent>

        <CardFooter className="justify-end">
          <ButtonGroup isMutating={isMutating} />
        </CardFooter>
      </form>
    </Card>
  );
}

export default function SellerProfileUI({ id }: { id: string }): JSX.Element {
  const { data } = useSWR<SellerType>(`/seller/get/${id}`, fetcher);
  const [image, setImage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const { showStatus } = useStatus();

  const { trigger, isMutating } = useSWRMutation(
    `/seller/edit/${data?._id}`,
    updateRequest,
  );

  useEffect(() => {
    setImage(data?.img);
  }, [data]);

  const updateProfileImage = async () => {
    if (!image) {
      toast.error("Please select an image");
      return;
    }

    if (isLoading) {
      toast.error("Please wait for image upload to complete");
      return;
    }

    const res = await trigger({ img: image });

    showStatus("/seller", "Profile image successfully updated", res);
  };

  return (
    <>
      <div className="flex flex-col gap-8 my-8 xl:flex-row justify-center">
        <form
          action={updateProfileImage}
          className="flex flex-col items-center"
        >
          <ImageUploader
            setIsLoading={setIsLoading}
            imgUrl={image}
            setImgUrl={setImage}
            endpoint="seller"
          />
          <SubmitButton
            isMutating={isMutating}
            style="w-full mt-2"
            text="Update profile picture"
            variant="outline"
          />
        </form>
        {data ? <BalanceCard profile={data} /> : <LoadingSkeleton />}
      </div>

      <div className="grid grid-cols-1 gap-8 w-full">
        <SellerInfo data={data} />
        <SellerSecurity password={data?.password} id={data?._id} />
      </div>
    </>
  );
}