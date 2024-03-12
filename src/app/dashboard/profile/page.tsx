"use client";
import FullPageLoading from "@/components/native/FullPageLoading";
import PageTop from "@/components/native/PageTop";
import ProfileUI from "@/shared/profile/ProfileUI";
import { ProfileType } from "@/shared/profile/profile.t";
import { fetcher } from "@/utils/fetcher";
import { useContext } from "react";
import useSWR from "swr";
import { BACKEND_URL } from "../../../../site-info";
import { UserAccessContext } from "../access-provider";

export default function Profile() {
  const { userId } = useContext(UserAccessContext);
  const {
    data: admin,
    error,
    isLoading,
  } = useSWR<ProfileType>(`${BACKEND_URL}/api/admin/get/${userId}`, fetcher);

  if (isLoading) {
    return <FullPageLoading />;
  }

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
