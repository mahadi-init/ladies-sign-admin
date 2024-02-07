"use server";

import { BACKEND_URL } from "@/consts/site-info";
import { Response } from "@/types/response";
import { cookies } from "next/headers";

const cookiesSetup = async (role: string) => {
  switch (role) {
    case "Admin":
      cookies().set("access-token", process.env.ADMIN_TOKEN as string);
      break;
    case "Super Admin":
      cookies().set("access-token", process.env.SUPER_ADMIN_TOKEN as string);
      break;
    default:
      cookies().set("access-token", process.env.SELLER_TOEKN as string);
      break;
  }
};

export const userSignIn = async (
  email: string,
  password: string
): Promise<Response> => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
      cache: "no-store",
    });

    if (res.status === 200) {
      const { name, role } = await res.json();
      cookiesSetup(role);

      return {
        status: 200,
        message: `${name} signed in as ${role}`,
      };
    }

    throw new Error();
  } catch (err) {
    return {
      status: 400,
      message: "Login failed",
    };
  }
};
