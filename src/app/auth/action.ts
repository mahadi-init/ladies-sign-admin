"use server";

import { signIn, signOut } from "@/auth";
import { redirect } from "next/navigation";

export async function login(phone?: string, password?: string) {
  try {
    await signIn("credentials", {
      phone: phone,
      password: password,
      redirect: false,
    });
  } catch (error) {
    return {
      success: false,
    };
  }

  redirect("/dashboard");
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
