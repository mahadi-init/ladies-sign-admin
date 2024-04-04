"use client";
import PageTop from "@/components/native/PageTop";
import ProfileUI from "@/shared/profile/ProfileUI";
import { BACKEND_URL } from "@/site-info";
import { ProfileType } from "@/types/profile.t";
import { fetcher } from "@/utils/fetcher";
import { useContext } from "react";
import useSWR from "swr";
import { UserAccessContext } from "../access-provider";

export default function Profile() {
  const { userId } = useContext(UserAccessContext);
  const {
    data: admin,
    error,
    isLoading,
  } = useSWR<ProfileType>(`${BACKEND_URL}/api/admin/get/${userId}`, fetcher);

  if (error) {
    return new error();
  }

  return (
    <>
      <PageTop title="Profile" />
      {/* @ts-expect-error */}
      <ProfileUI data={admin.data} showBalance={false} />
    </>
  );
}
