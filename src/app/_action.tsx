"use server";

import { BACKEND_URL } from "@/consts/site-info";
import { Response } from "@/types/response";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const cookiesSetup = async (role: string) => {
  switch (role) {
    case "Admin":
      cookies().set("role-token", process.env.ADMIN_TOKEN as string);
      break;
    case "Super Admin":
      cookies().set("role-token", process.env.ADMIN_TOKEN as string);
      break;
    default:
      cookies().set("role-token", "damnseller");
  }
};

export async function userSignin<T>(data: T): Promise<Response> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const { _id, name, role } = await res.json();
    const d = await res.json();
    console.log(d);

    if (res.ok) {
      // cookiesSetup(role);
      return {
        status: 200,
        message: "LOL",
      };
    }

    throw new Error();
  } catch (err) {
    return {
      status: 400,
      message: "something went wrong",
    };
  }
}
