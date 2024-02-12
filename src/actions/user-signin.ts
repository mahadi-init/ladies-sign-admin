"use server";

import { BACKEND_URL } from "@/consts/site-info";
import { Response } from "@/types/response";
import { cookiesSetup } from "@/utils/cookies-setup";

export const userSignIn = async (
  email: string,
  password: string,
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
      const { _id, name, role } = await res.json();
      cookiesSetup(_id, role);

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
