import { cookies } from "next/headers";

export const cookiesSetup = async (id: string, role: string) => {
  cookies().set("user-access-id", id);

  switch (role) {
    case "Super-Admin":
      cookies().set("access-token", process.env.SUPER_ADMIN_TOKEN as string);
      break;
    case "Admin":
      cookies().set("access-token", process.env.ADMIN_TOKEN as string);
      break;
    case "Editor":
      cookies().set("access-token", process.env.SUPER_EDITOR_TOKEN as string);
      break;
    default:
      cookies().set("access-token", process.env.SELLER_TOKEN as string);
      break;
  }
};
