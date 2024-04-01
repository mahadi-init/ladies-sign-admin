import { z } from "zod";

export const SellerSchema = z.object({
  _id: z.string(),
  name: z.string().min(3, "Name is too short"),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  image: z.string().url(),
  address: z.string().min(8, "Address is too short"),
  phone: z.string().min(11, "Phone number must be 11 characters"),
  sellerLicense: z.string(),
  nidImage: z.string().url(),
  nidNumber: z.string().min(8, "NID number must be 8 characters"),
  balance: z.number(),
  commission: z.number(),
  sales: z.number(),
  orders: z.array(z.string()),
  referrals: z.array(z.string()),
  status: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string()
})

export type SellerType = z.infer<typeof SellerSchema>