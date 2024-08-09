"use server";

import { signIn, signOut } from "@/auth";
import { connectDB } from "@/db/connect";
import { redirect } from "next/navigation";

export async function login(phone?: string, password?: string) {
  connectDB()

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
  await signOut({ redirectTo: "/auth" });
}
