import { Role } from "./role";

export interface ProfileType {
  name?: string;
  email?: string;
  password: string;
  image?: string;
  nidImage: string;
  city?: string;
  address?: string;
  referralCode?: string;
  phone?: string;
  status?: string;
  role?: Role;
  joiningDate?: Date;
}
