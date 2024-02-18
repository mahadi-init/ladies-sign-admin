"use client";
import FullPageLoading from "@/components/native/FullPageLoading";
import PageTop from "@/components/native/PageTop";
import { BACKEND_URL } from "@/consts/site-info";
import { ProfileType } from "@/types/profile";
import SharedProfileUI from "@/ui/SharedProfileUI";
import { fetcher } from "@/utils/fetcher";
import { useContext, useState } from "react";
import useSWR from "swr";
import { UserAccessContext } from "../access-provider";

export default function Profile() {
  const { userId } = useContext(UserAccessContext);
  const { data, error, isLoading } = useSWR<ProfileType>(
    `${BACKEND_URL}/api/admin/get/${userId}`,
    fetcher
  );
  const [image, setImage] = useState<string>();

  if (isLoading) {
    return <FullPageLoading />;
  }

  if (error) {
    return new error();
  }

  return (
    <>
      <PageTop title="Profile" />
      <SharedProfileUI data={data} />
    </>
  );
}
