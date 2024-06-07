import { getCookie } from "cookies-next";

export const getAuthCookie = () => {
  const authCookie = getCookie("auth");
  return authCookie
};
