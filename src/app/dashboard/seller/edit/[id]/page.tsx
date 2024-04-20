"use client";
import FetchErrorMessage from "@/components/native/FetchErrorMessage";
import { fetcher } from "@/https/get-request";
import updateRequest from "@/https/update-request";
import { SellerType } from "@/types/seller.t";
import SellerUI from "@/ui/SellerUI";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export default function EditSeller({ params }: { params: { id: string } }) {
  const { data, error } = useSWR<SellerType>(
    `/seller/get/${params.id}`,
    fetcher
  );

  const { trigger, isMutating } = useSWRMutation(
    `/seller/edit/${params.id}`,
    updateRequest
  );

  if (error) {
    return <FetchErrorMessage error={error} />;
  }

  return (
    <SellerUI
      {...data}
      trigger={trigger}
      isMutating={isMutating}
      successMessage="Seller updated successfully"
    />
  );
}
