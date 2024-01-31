"use server";

import { BACKEND_URL } from "@/consts/site-info";
import { Response } from "@/types/response";
import { revalidateTag } from "next/cache";

export async function editCoupon<T extends { _id?: string }>(
  value: T,
): Promise<Response> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/coupon/${value._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    });

    if (res.ok) {
      revalidateTag("coupons");

      return {
        status: 200,
        message: "Coupon edited successfully",
      };
    }

    throw new Error();
  } catch (err) {
    return {
      status: 400,
      message: "Something went wrong",
    };
  }
}
