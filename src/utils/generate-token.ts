import { site } from "@/site-config";
import jwt from "jsonwebtoken";

interface PayloadAuth {
  id: string;
  name: string;
  role: string;
  status: boolean;
}

export const generateToken = (user: Partial<PayloadAuth>) => {
  const payload = {
    id: user.id,
    name: user.name,
    role: user.role,
    status: user.status,
  };

  const token = jwt.sign(payload, site.JWT_SECRET, { expiresIn: "7d" });
  return token;
};
