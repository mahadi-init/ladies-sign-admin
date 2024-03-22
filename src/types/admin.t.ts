export interface AdminType {
  _id: string;
  name: string;
  image: string;
  email: string;
  phone: string;
  status: "ACTIVE" | "INACTIVE";
  password: string;
  role: string;
  joiningDate: Date;
}
