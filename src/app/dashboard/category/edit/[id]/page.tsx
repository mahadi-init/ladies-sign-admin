"use client";
import FetchErrorMessage from "@/components/native/FetchErrorMessage";
import { fetcher } from "@/https/get-request";
import updateRequest from "@/https/update-request";
import { CategoryType } from "@/types/category.t";
import CategoryUI from "@/ui/CategoryUI";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export default function EditCategory({ params }: { params: { id: string } }) {
  // fetch category data
  const { data, error } = useSWR<CategoryType>(
    `/category/get/${params.id}`,
    fetcher
  );

  // update request
  const { trigger, isMutating } = useSWRMutation(
    `/category/edit/${params.id}`,
    updateRequest
  );

  if (error) {
    return <FetchErrorMessage error={error} />;
  }

  return (
    <CategoryUI
      {...data}
      trigger={trigger}
      isMutating={isMutating}
      successMessage="Category updated successfully"
    />
  );
}
