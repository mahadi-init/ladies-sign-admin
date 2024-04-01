"use client";
import addRequest from "@/https/add-request";
import { siteConfig } from "@/site-info";
import BrandUI from "@/ui/BrandUI";
import useSWRMutation from "swr/mutation";

export default function AddBrand() {
  const { trigger, isMutating } = useSWRMutation(
    `${siteConfig.BACKEND_URL}/brand/add`,
    addRequest
  );

  return (
    <BrandUI
      trigger={trigger}
      isMutating={isMutating}
      successMessage="Brand created successfully"
    />
  );
}
