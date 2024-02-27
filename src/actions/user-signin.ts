"use server";

import { BACKEND_URL } from "@/consts/site-info";
import { Response } from "@/types/response";
import { Role } from "@/types/role";
import { cookiesSetup } from "@/utils/cookies-setup";

interface UserResponseType extends Response {
  id?: string;
  role?: Role;
}

/**
 * User sign-in function that sends a POST request to the backend API to log in the user.
 *
 * @param {string} email - The email of the user
 * @param {string} password - The password of the user
 * @return {Promise<UserResponseType>} An object containing the user ID, role, status, and a message
 */
export async function userSignIn(
  email: string,
  password: string
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

    if (res.status === 200) {
      const { _id, name, role } = await res.json();
      cookiesSetup(_id, role);

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
