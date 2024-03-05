import { clerkClient } from "@clerk/nextjs";

export default async function getAllUsers() {
  const users = await clerkClient.users.getUserList();
  return users;
}
