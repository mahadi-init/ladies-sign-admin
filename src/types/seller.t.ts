import { z } from "zod";

export const SellerSchema = z
  .object({
    _id: z.string(),
    name: z.string().min(3, "name is too short"),
    img: z.string().url(),
    phone: z.string().min(11, "phone number must be 11 characters"),
    email: z.string().email(),
    whatsapp: z.string().min(11, "whatsapp number must be 11 characters"),
    password: z.string().min(6, "password must be at least 6 characters"),
    address: z.string().min(8, "address is too short"),
    facebookProfile: z.string(),
    facebookPage: z.string(),
    license: z.string(),
    nid: z.string().min(8, "minimum 8 characters required"),
    balance: z.number(),
    orders: z.array(z.string()),
    referrals: z.array(z.string()),
    approved: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .partial();

export type SellerType = z.infer<typeof SellerSchema>;
