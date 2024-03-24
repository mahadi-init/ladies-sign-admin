export interface UserType {
  id: string;
  banned: boolean;
  image: string;
  name: string;
  email: string;
  phone: string;
  lastSignInAt: number | null;
}
