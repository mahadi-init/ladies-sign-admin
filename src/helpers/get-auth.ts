import { getCookie } from "cookies-next";

/**
 * Retrieves the authentication cookie from the browser cookies. If the cookie is not found,
 * it returns the value of the environment variable NEXT_PUBLIC_GUEST_TOKEN.
 *
 * @return {string} The value of the authentication cookie or the value of the environment variable NEXT_PUBLIC_GUEST_TOKEN.
 */
export const getAuthCookie = (): string => {
  const authCookie = getCookie("auth");

  return authCookie ?? process.env.NEXT_PUBLIC_GUEST_TOKEN!;
};
