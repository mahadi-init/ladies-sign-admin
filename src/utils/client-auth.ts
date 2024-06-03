import { site } from "@/site-config";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";

type PayloadType = {
  status: boolean;
  name: string;
  role: string;
  id: string;
};

export const getClientAuthInfo = ():
  | Partial<PayloadType>
  | null
  | undefined => {
  const auth = getCookie("auth") as string;

  try {
    // @ts-ignore
    const payload: Partial<PayloadType> = jwt.verify(auth, site.JWT_SECRET);

    if (payload) {
      return payload;
    }
  } catch (error) {
    return null;
  }
};
