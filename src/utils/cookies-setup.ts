import { AccessToken } from "@/types/token";
import { cookies } from "next/headers";

/**
 * Sets up cookies for user access based on the provided id and role.
 *
 * @param {string} id - The user access id
 * @param {string} role - The role of the user
 * @return {Promise<void>} Promise that resolves when the cookies are set up
 */
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
