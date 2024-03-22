import { Role } from "@/types/enums.t";

export interface ProfileType {
  _id: string;
  name: string;
  email: string;
  password: string;
  image: string;
  nidImage: string;
  city: string;
  address: string;
  referralCode: string;
  phone: string;
  status: "ACTIVE" | "INACTIVE";
  role: Role;
  joiningDate: Date;
}
