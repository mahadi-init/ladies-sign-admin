"use server";

import { cookiesSetup } from "@/utils/cookies-setup";
import { BACKEND_URL } from "../../site-info";
import { LocalResponse } from "@/types/response.t";
import { Role } from "@/types/enums.t";
import { redirect } from "next/navigation";

interface UserResponseType extends LocalResponse {
  id?: string;
  role?: Role;
}

export async function userSignIn(
  email: string,
  password: string,
): Promise<UserResponseType> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/admin/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
      cache: "no-store",
    });

    if (res.ok) {
      const { _id, name, role } = await res.json();
      await cookiesSetup(_id, role);

      return {
        id: _id,
        role: role,
        status: 200,
        message: `${name} signed in as ${role}`,
      };
    } else {
      const { message } = await res.json();

      if (!message) {
        throw new Error();
      }

      return {
        status: 400,
        message: message,
      };
    }
  } catch (err) {
    return {
      status: 400,
      message: "Login failed",
    };
  }
}
