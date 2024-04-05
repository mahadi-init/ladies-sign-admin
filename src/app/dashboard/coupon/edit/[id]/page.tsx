"use client";
import FetchErrorMessage from "@/components/native/FetchErrorMessage";
import { fetcher } from "@/https/get-request";
import updateRequest from "@/https/update-request";
import { CategoryType } from "@/types/category.t";
import CouponUI from "@/ui/CouponUI";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export default function EditCoupon({ params }: { params: { id: string } }) {
  // fetch category data
  const { data, error } = useSWR<CategoryType>(
    `/coupon/get/${params.id}`,
    fetcher
  );

  // update request
  const { trigger, isMutating } = useSWRMutation(
    `/coupon/edit/${params.id}`,
    updateRequest
  );

  if (error) {
    return <FetchErrorMessage error={error} />;
  }

  return (
    <CouponUI
      {...data}
      trigger={trigger}
      isMutating={isMutating}
      successMessage="Category updated successfully"
    />
  );
}
