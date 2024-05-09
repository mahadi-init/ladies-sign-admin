"use client";
import addRequest from "@/https/add-request";
import SellerUI from "@/ui/SellerUI";
import useSWRMutation from "swr/mutation";

export default function Seller() {
  const { trigger, isMutating } = useSWRMutation(
    `/seller/register`,
    addRequest
  );

  return (
    <SellerUI
      trigger={trigger}
      isMutating={isMutating}
      successMessage="Seller add successfully"
    />
  );
}
