"use client";
import addRequest from "@/https/add-request";
import CouponUI from "@/ui/CouponUI";
import useSWRMutation from "swr/mutation";

export default function AddCoupon() {
  const { trigger, isMutating } = useSWRMutation(`/coupon/add`, addRequest);

  return (
    <CouponUI
      trigger={trigger}
      isMutating={isMutating}
      successMessage="Coupon created successfully"
    />
  );
}
