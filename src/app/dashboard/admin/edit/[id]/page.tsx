"use client";
import FetchErrorMessage from "@/components/native/FetchErrorMessage";
import { fetcher } from "@/https/get-request";
import updateRequest from "@/https/update-request";
import { AdminType } from "@/types/admin.t";
import AdminUI from "@/ui/AdminUI";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export default function EditAdmin({ params }: { params: { id: string } }) {
  const { data, error } = useSWR<AdminType>(`/admin/get/${params.id}`, fetcher);
  const { trigger, isMutating } = useSWRMutation(
    `/admin/edit/${params.id}`,
    updateRequest
  );

  if (error) {
    return <FetchErrorMessage error={error} />;
  }

  return (
    <AdminUI
      {...data}
      trigger={trigger}
      isMutating={isMutating}
      successMessage="Brand updated successfully"
    />
  );
}
