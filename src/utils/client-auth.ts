import { site } from "@/site-config";
import { getCookie, setCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { generateToken } from "./generate-token";
import { fetcher } from "@/https/get-request";

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

export const setClientAuthInfo = (data: Partial<PayloadType>) => {
  setCookie("auth", generateToken(data), { sameSite: "none", secure: true });
};

export const dbUpdatedAuthStatus = async (data: Partial<PayloadType>) => {
  try {
    let res: { status: boolean };

    // seller doesn't have role
    if (!data.role) {
      res = await fetcher(`/seller/status/${data.id}`);
    } else {
      res = await fetcher(`/admin/status/${data.id}`);
    }

    setClientAuthInfo({
      name: data.name,
      id: data.id,
      role: data.role,
      status: res.status,
    });

    return res.status;
  } catch (error) {
    return false;
  }
};
