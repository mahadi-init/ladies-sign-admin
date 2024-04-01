"use client";
import FetchErrorMessage from "@/components/native/FetchErrorMessage";
import updateRequest from "@/https/update-request";
import { siteConfig } from "@/site-info";
import { BrandType } from "@/types/brand.t";
import BrandUI from "@/ui/BrandUI";
import { fetcher } from "@/utils/fetcher";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export default function EditBrand({ params }: { params: { id: string } }) {
  const { data, error } = useSWR<BrandType>(`/brand/get/${params.id}`, fetcher);
  const { trigger, isMutating } = useSWRMutation(
    `${siteConfig.BACKEND_URL}/brand/edit/${params.id}`,
    updateRequest
  );

  if (error) {
    return <FetchErrorMessage error={error} />;
  }

  return (
    <BrandUI
      {...data}
      trigger={trigger}
      isMutating={isMutating}
      successMessage="Brand edited successfully"
    />
  );
}
