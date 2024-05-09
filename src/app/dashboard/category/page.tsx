"use client";
import addRequest from "@/https/add-request";
import CategoryUI from "@/ui/CategoryUI";
import useSWRMutation from "swr/mutation";

export default function AddCategory() {
  const { trigger, isMutating } = useSWRMutation(`/category/add`, addRequest);

  return (
    <CategoryUI
      trigger={trigger}
      isMutating={isMutating}
      successMessage="Category added successfully"
    />
  );
}
