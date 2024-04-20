import { z } from "zod";

export const SellerSchema = z
  .object({
    _id: z.string(),
    cid: z.coerce.number(),
    name: z.string().min(3, "Name is too short"),
    phone: z.string().min(11, "Phone number must be 11 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    img: z.string().url(),
    address: z.string().min(8, "Address is too short"),
    sellerLicense: z.string(),
    nidNumber: z.string().min(8, "NID number must be 8 characters"),
    balance: z.number(),
    commission: z.number(),
    sales: z.number(),
    orders: z.array(z.string()),
    referrals: z.array(z.string()),
    status: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .partial();

export type SellerType = z.infer<typeof SellerSchema>;
