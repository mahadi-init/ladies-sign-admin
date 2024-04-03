"use client";
import FetchErrorMessage from "@/components/native/FetchErrorMessage";
import { fetcher } from "@/https/get-request";
import updateRequest from "@/https/update-request";
import { BrandType } from "@/types/brand.t";
import BrandUI from "@/ui/BrandUI";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export default function EditBrand({ params }: { params: { id: string } }) {
  const { data, error } = useSWR<BrandType>(`/brand/get/${params.id}`, fetcher);
  const { trigger, isMutating } = useSWRMutation(
    `/brand/edit/${params.id}`,
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
      successMessage="Brand updated successfully"
    />
  );
}
