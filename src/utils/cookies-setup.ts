import { AccessToken } from "@/types/token.t";
import { cookies } from "next/headers";

export const cookiesSetup = async (id: string, role: string): Promise<void> => {
  cookies().set("user-access-id", id);

  switch (role) {
    case "Super-Admin":
      cookies().set("access-token", AccessToken.SUPER_ADMIN);
      break;
    case "Admin":
      cookies().set("access-token", AccessToken.ADMIN);
      break;
    case "Editor":
      cookies().set("access-token", AccessToken.EDITOR);
      break;
    default:
      cookies().set("access-token", AccessToken.SELLER);
      break;
  }
};
