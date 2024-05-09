"use client";

import addRequest from "@/https/add-request";
import AdminUI from "@/ui/AdminUI";
import useSWRMutation from "swr/mutation";

export default function AddAdmin() {
  const { trigger, isMutating } = useSWRMutation(`/admin/register`, addRequest);

  return (
    <AdminUI
      trigger={trigger}
      isMutating={isMutating}
      successMessage="Admin added successfully"
    />
  );
}
