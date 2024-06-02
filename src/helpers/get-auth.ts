import { getCookie } from "cookies-next";

export const getAuthCookie = () => {
  const auth = getCookie("auth");

  if (auth) {
    return auth;
  }

  return process.env.NEXT_PUBLIC_GUEST_TOKEN;
};
