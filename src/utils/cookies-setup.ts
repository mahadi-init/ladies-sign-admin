import { AccessToken } from "@/types/token.t";
import { cookies } from "next/headers";

export const cookiesSetup = async (id: string, role: string): Promise<void> => {
  let token = "";

  switch (role) {
    case "SUPER-ADMIN":
      token = AccessToken.SUPER_ADMIN;
      break;
    case "ADMIN":
      token = AccessToken.ADMIN;
      break;
    case "EDITOR":
      token = AccessToken.EDITOR;
      break;
    default:
      token = AccessToken.EDITOR;
      break;
  }

  cookies().set("access-token", token);
  cookies().set("user-access-id", id);
};
